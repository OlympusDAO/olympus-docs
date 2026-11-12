import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";

const [input, output, project] = process.argv.slice(2).map((p) => resolve(p));
const site = "/main/contracts/docs/";
const included = (p) =>
  p.startsWith("src/") && !/^src\/(scripts|test)\//.test(p);
const files = (dir, extension) =>
  readdirSync(dir, { recursive: true }).filter((p) => p.endsWith(extension));
const pages = new Map();

function addPage(file, route) {
  let content = readFileSync(file, "utf8").replace(
    /^---\n[\s\S]*?\n---\n\n/,
    "",
  );
  // MDX 3 treats Markdown autolinks as JSX. Keep fenced examples verbatim.
  content = content.replace(
    /(^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\2[ \t]*$)|<(https?:\/\/[^<>\s]+|[^<>\s]+@[^<>\s]+)>/gm,
    (_, code, _fence, link) =>
      code ?? `[${link}](${link.includes("://") ? "" : "mailto:"}${link})`,
  );
  // Make legacy MDX 1 emphasis explicit so regenerated pages keep their appearance.
  for (const [before, after] of [
    [
      "positionIds_ array does not match the length of the amounts_",
      "positionIds<em> array does not match the length of the amounts</em>",
    ],
    [
      "minimumDeposit_ > depositCap_",
      "minimumDeposit<em> &gt; depositCap</em>",
    ],
    [
      "baseToken_ is used as collateralToken, quoteToken_",
      "baseToken<em> is used as collateralToken, quoteToken</em>",
    ],
    [
      "10**(collateral token decimals) assets of collateral token quoted in\n10**(loan token decimals)",
      "10<strong>(collateral token decimals) assets of collateral token quoted in\n10</strong>(loan token decimals)",
    ],
  ]) {
    content = content.replaceAll(before, after);
  }
  // This NatSpec formula is prose; Markdown otherwise reads it as emphasis.
  content = content.replaceAll(
    "0.25 * 1e3 * decayInterval / marketDuration",
    "`0.25 * 1e3 * decayInterval / marketDuration`",
  );
  // Repeated @dev tags split list items into separate italic blocks. Keep
  // fenced examples verbatim while joining list items and parenthetical continuations.
  content = content.replace(
    /(^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\2[ \t]*$)|\n\n<\/i>\n\n<i>\n\n(?=[ \t]*(?:[-*+] |\d+[.)] |\())/gm,
    (_, code) => code ?? "\n",
  );
  const source = content.match(
    /\[Git Source\]\(https:\/\/github\.com\/OlympusDAO\/olympus-v3\/blob\/[^/]+\/(src\/[^)]+)\)/,
  )?.[1];
  if (!source || !included(source))
    throw new Error(`Missing project source in ${file}`);
  const destination = `${source}/${basename(route, ".mdx")}.md`;
  pages.set(destination, {
    route: `/${route.slice(0, -4)}`,
    source,
    destination,
    content,
  });
}

for (const file of files(input, ".mdx").sort()) {
  if (included(file)) addPage(join(input, file), file);
}

// Forge 1.8 flattens symbols into their source directory. Its manifest repeats
// paths when two files declare the same symbol, but only the last page survives.
// Render those sources individually to retain both existing Solidity URLs.
const manifest = join(input, ".forge-doc-manifest");
if (existsSync(manifest)) {
  const counts = new Map();
  for (const route of readFileSync(manifest, "utf8").trim().split("\n")) {
    if (included(route)) counts.set(route, (counts.get(route) ?? 0) + 1);
  }
  for (const [route, count] of counts) {
    if (count < 2) continue;
    const symbol = basename(route, ".mdx").split(".").at(-1);
    const sources = readdirSync(join(project, dirname(route)))
      .filter((file) => file.endsWith(".sol"))
      .map((file) => join(dirname(route), file))
      .filter((file) =>
        new RegExp(
          `\\b(?:contract|interface|library|struct|enum|error|type|function)\\s+${symbol}\\b`,
        ).test(readFileSync(join(project, file), "utf8")),
      );
    if (sources.length !== count)
      throw new Error(`Cannot recover all sources for ${route}`);
    const scratch = mkdtempSync(join(tmpdir(), "forge-doc-"));
    try {
      for (const source of sources) {
        execFileSync("forge", ["doc", "--root", project, "--out", scratch], {
          env: { ...process.env, FOUNDRY_SRC: source },
          stdio: "pipe",
        });
        addPage(join(scratch, "src/pages", route), route);
      }
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  }
}

const routes = new Map();
for (const page of pages.values()) {
  const targets = routes.get(page.route) ?? [];
  targets.push(page);
  routes.set(page.route, targets);
}

for (const page of pages.values()) {
  const source = project
    ? readFileSync(join(project, page.source), "utf8")
    : "";
  const imports = new Set(
    [...source.matchAll(/\bimport\s+[^;]*?["']([^"']+)["']\s*;/g)].map(
      ([, path]) =>
        path.startsWith(".") ? join(dirname(page.source), path) : path,
    ),
  );
  page.content = page.content.replace(
    /\[([^\]]+)\]\((\/src\/[^)#]+)(#[^)]*)?\)/g,
    (_, label, route, fragment = "") => {
      const targets = routes.get(route);
      if (!targets)
        throw new Error(`Unpublished link ${route} in ${page.destination}`);
      const target =
        targets.find((p) => p.source === page.source) ??
        targets.find((p) => imports.has(p.source)) ??
        targets[0];
      return `[${label}](${site}${target.destination.slice(0, -3)}${fragment})`;
    },
  );
}

rmSync(output, { recursive: true, force: true });
for (const page of pages.values()) {
  mkdirSync(dirname(join(output, page.destination)), { recursive: true });
  writeFileSync(join(output, page.destination), page.content);
}

const directories = new Set();
for (const page of pages.values()) {
  for (let dir = dirname(page.source); dir !== "."; dir = dirname(dir))
    directories.add(dir);
}
function contents(dir, from, recursive = false, indent = "") {
  const children = [...directories].filter((p) => dirname(p) === dir).sort();
  const local = [...pages.values()]
    .filter((p) => dirname(p.source) === dir)
    .sort((a, b) => a.destination.localeCompare(b.destination, "en"));
  return [
    ...children.flatMap((child) => [
      `${indent}- [${basename(child)}](${site}${child})`,
      ...(recursive ? contents(child, from, true, `${indent}  `) : []),
    ]),
    ...local.map(
      (p) =>
        `${indent}- [${basename(p.destination, ".md").split(".").slice(1).join(".")}](${relative(from, p.destination)})`,
    ),
  ];
}
for (const dir of directories) {
  const name = basename(dir);
  const title = name[0].toUpperCase() + name.slice(1).toLowerCase();
  writeFileSync(
    join(output, dir, "index.md"),
    `# ${title}\n\n${contents(dir, dir).join("\n")}\n`,
  );
}
writeFileSync(
  join(output, "00_overview.md"),
  `# Summary\n\n${contents(".", ".", true).join("\n")}\n`,
);
writeFileSync(
  join(output, "_category_.json"),
  `${JSON.stringify({ label: "Contract Documentation", position: 1, collapsed: true }, null, 2)}\n`,
);
console.log(
  `Converted ${pages.size} pages and ${directories.size} directory indexes.`,
);
