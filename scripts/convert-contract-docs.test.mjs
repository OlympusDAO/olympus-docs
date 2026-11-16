import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { test } from "node:test";

test("converts Forge pages while preserving Solidity URLs and excluding tooling", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-test-"));
  try {
    const pages = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(pages, "src/policies"), { recursive: true });
    mkdirSync(join(pages, "src/test"), { recursive: true });
    const page = (name, source, body = "") =>
      `---\ntitle: "${name}"\n---\n\n# ${name}\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/${source})\n\n${body}\n`;
    writeFileSync(
      join(pages, "src/abstract.Policy.mdx"),
      page("Policy", "src/Kernel.sol"),
    );
    writeFileSync(
      join(pages, "src/policies/contract.Example.mdx"),
      page(
        "Example",
        "src/policies/Example.sol",
        "**Inherits:** [Policy](/src/abstract.Policy)",
      ),
    );
    writeFileSync(
      join(pages, "src/test/contract.Test.mdx"),
      page("Test", "src/test/Test.sol"),
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      pages,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/policies/Example.sol/contract.Example.md"),
      "utf8",
    );
    assert.match(result, /^# Example/);
    assert.match(
      result,
      /\[Policy\]\(\/main\/contracts\/docs\/src\/Kernel.sol\/abstract.Policy\)/,
    );
    assert.match(
      readFileSync(join(output, "00_overview.md"), "utf8"),
      /Example.sol\/contract.Example/,
    );
    assert.doesNotMatch(
      readFileSync(join(output, "00_overview.md"), "utf8"),
      /Test/,
    );
    assert.match(
      readFileSync(join(output, "src/index.md"), "utf8"),
      /\[policies\]\(\/main\/contracts\/docs\/src\/policies\)/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("recovers colliding symbols and links consumers to their imported version", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-collision-"));
  try {
    const input = join(root, "input");
    const project = join(root, "project");
    const output = join(root, "output");
    const bin = join(root, "bin");
    for (const dir of [
      join(input, "src/interfaces"),
      join(project, "src/interfaces"),
      bin,
    ]) {
      mkdirSync(dir, { recursive: true });
    }
    const page = (source, body = "") =>
      `# Token\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/${source})\n\n${body}\n`;
    for (const version of ["Old", "New"]) {
      const source = `src/interfaces/${version}.sol`;
      writeFileSync(join(project, source), "interface Token {}\n");
      writeFileSync(join(project, `${source}.mdx`), page(source));
    }
    writeFileSync(
      join(project, "src/Consumer.sol"),
      'import {Token} from "./interfaces/Old.sol";\n',
    );
    writeFileSync(
      join(input, "src/contract.Consumer.mdx"),
      page("src/Consumer.sol", "[Token](/src/interfaces/interface.Token)"),
    );
    writeFileSync(
      join(input, "src/interfaces/interface.Token.mdx"),
      page("src/interfaces/New.sol"),
    );
    writeFileSync(
      join(input, ".forge-doc-manifest"),
      "src/interfaces/interface.Token.mdx\nsrc/interfaces/interface.Token.mdx\n",
    );
    // Stand in for Forge at its CLI boundary; each scoped run returns its source's page.
    writeFileSync(
      join(bin, "forge"),
      `#!${process.execPath}
const fs = require("node:fs");
const path = require("node:path");
const args = process.argv;
const out = path.join(args[args.indexOf("--out") + 1], "src/pages/src/interfaces");
fs.mkdirSync(out, {recursive: true});
fs.copyFileSync(path.join(args[args.indexOf("--root") + 1], process.env.FOUNDRY_SRC + ".mdx"), path.join(out, "interface.Token.mdx"));
`,
      { mode: 0o755 },
    );
    execFileSync(
      process.execPath,
      ["scripts/convert-contract-docs.mjs", input, output, project],
      {
        env: { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH}` },
      },
    );
    assert.match(
      readFileSync(
        join(output, "src/Consumer.sol/contract.Consumer.md"),
        "utf8",
      ),
      /\[Token\]\(\/main\/contracts\/docs\/src\/interfaces\/Old.sol\/interface.Token\)/,
    );
    for (const version of ["Old", "New"]) {
      assert.match(
        readFileSync(
          join(output, `src/interfaces/${version}.sol/interface.Token.md`),
          "utf8",
        ),
        new RegExp(`${version}\\.sol`),
      );
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("joins condition lists split across Forge italic blocks and preserves code examples", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-lists-"));
  try {
    const input = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(input, "src"), { recursive: true });
    const fragmented = [
      "<i>\n\nThis function will revert if:\n\n</i>",
      "<i>\n\n- The caller is not permissioned\n\n</i>",
      "<i>\n\n- The target is not a contract\n\n</i>",
      "<i>\n\n(or the target is not configured)\n\n</i>",
      "<i>\n\n- The amount is zero\n\n</i>",
    ].join("\n\n");
    const example = `\`\`\`markdown\n${fragmented}\n\`\`\``;
    writeFileSync(
      join(input, "src/contract.Example.mdx"),
      `# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n${fragmented}\n\n${example}\n`,
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      input,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/Example.sol/contract.Example.md"),
      "utf8",
    );
    const prose = result.slice(0, result.indexOf("```markdown"));
    assert.equal(prose.match(/<i>/g)?.length, 1);
    assert.equal(prose.match(/<\/i>/g)?.length, 1);
    assert.match(
      prose,
      /- The caller is not permissioned\n- The target is not a contract/,
    );
    assert.match(
      prose,
      /- The target is not a contract\n\(or the target is not configured\)\n- The amount is zero/,
    );
    assert.ok(
      result.includes(example),
      "literal Markdown examples must remain unchanged",
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("makes Forge autolinks compatible with MDX without changing code examples", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-autolinks-"));
  try {
    const input = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(input, "src"), { recursive: true });
    const example = "```md\n<https://example.com>\n```";
    writeFileSync(
      join(input, "src/contract.Example.mdx"),
      `# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n<https://example.com> and <security@example.com>\n\n${example}\n`,
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      input,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/Example.sol/contract.Example.md"),
      "utf8",
    );
    assert.ok(result.includes("[https://example.com](https://example.com)"));
    assert.ok(
      result.includes("[security@example.com](mailto:security@example.com)"),
    );
    assert.ok(result.includes(example));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("keeps inline code literal and reads only Forge labels after autolinks", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-inline-"));
  try {
    const input = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(input, "src"), { recursive: true });
    const prose = [
      "Code `<https://x.org>` and `price * 10**(loan token decimals)` stay literal.",
      "Label <https://a.org>[`sign` in MetaMask] becomes a link.",
      "Citation <https://b.org>[1] keeps its URL.",
      "Link <https://c.org>[see](https://d.org) stays separate.",
      "Prose 10**(loan token decimals) becomes code.",
    ].join("\n\n");
    writeFileSync(
      join(input, "src/contract.Example.mdx"),
      `# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n${prose}\n`,
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      input,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/Example.sol/contract.Example.md"),
      "utf8",
    );
    for (const expected of [
      "Code `<https://x.org>` and `price * 10**(loan token decimals)` stay literal.",
      "Label [`sign` in MetaMask](https://a.org) becomes a link.",
      "Citation [https://b.org](https://b.org)[1] keeps its URL.",
      "Link [https://c.org](https://c.org)[see](https://d.org) stays separate.",
      "Prose `10**(loan token decimals)` becomes code.",
    ]) {
      assert.ok(result.includes(expected), expected);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("preserves legacy emphasis in Forge prose under MDX 3", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-emphasis-"));
  try {
    const input = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(input, "src"), { recursive: true });
    writeFileSync(
      join(input, "src/contract.Example.mdx"),
      "# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n<i>\n\nThe length of the positionIds_ array does not match the length of the amounts_ array\n\n</i>\n",
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      input,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/Example.sol/contract.Example.md"),
      "utf8",
    );
    assert.ok(
      result.includes(
        "positionIds<em> array does not match the length of the amounts</em> array",
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

for (const [name, opener, body, closer] of [
  ["longer closer", "```md", "<https://example.com>", "````"],
  [
    "tilde fence containing backticks",
    "~~~md",
    "```\n<https://example.com>\n```",
    "~~~~",
  ],
  ["indented closer", "```md", "<https://example.com>", "   ```  "],
  ["indented opener", "  ~~~md", "<https://example.com>", "  ~~~~"],
]) {
  test(`preserves a fenced example with ${name}`, () => {
    const root = mkdtempSync(join(tmpdir(), "contract-docs-fence-"));
    try {
      const input = join(root, "input");
      const output = join(root, "output");
      mkdirSync(join(input, "src"), { recursive: true });
      const example = `${opener}\n${body}\n${closer}`;
      writeFileSync(
        join(input, "src/contract.Example.mdx"),
        `# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n${example}\n\n<https://outside.example>\n`,
      );
      execFileSync(process.execPath, [
        "scripts/convert-contract-docs.mjs",
        input,
        output,
      ]);
      const result = readFileSync(
        join(output, "src/Example.sol/contract.Example.md"),
        "utf8",
      );
      assert.ok(result.includes(example), "fenced content must remain literal");
      assert.ok(
        result.includes("[https://outside.example](https://outside.example)"),
        "prose after the closer must still be converted",
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test("uses generated link labels and preserves oracle exponent operators", () => {
  const root = mkdtempSync(join(tmpdir(), "contract-docs-labels-"));
  try {
    const input = join(root, "input");
    const output = join(root, "output");
    mkdirSync(join(input, "src"), { recursive: true });
    writeFileSync(
      join(input, "src/contract.Example.mdx"),
      "# Example\n\n[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/abc/src/Example.sol)\n\n<https://eips.ethereum.org/EIPS/eip-712>[EIP 712]\n\n<https://eips.ethereum.org/EIPS/eip-2612>[EIP\n2612]\n\n<i>\n\nIt corresponds to the price of 10**(collateral token decimals) assets of collateral token quoted in\n10**(loan token decimals) assets of loan token.\n\n</i>\n",
    );
    execFileSync(process.execPath, [
      "scripts/convert-contract-docs.mjs",
      input,
      output,
    ]);
    const result = readFileSync(
      join(output, "src/Example.sol/contract.Example.md"),
      "utf8",
    );
    assert.ok(
      result.includes("[EIP 712](https://eips.ethereum.org/EIPS/eip-712)"),
    );
    assert.ok(
      result.includes("[EIP\n2612](https://eips.ethereum.org/EIPS/eip-2612)"),
    );
    assert.ok(result.includes("`10**(collateral token decimals)`"));
    assert.ok(result.includes("`10**(loan token decimals)`"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
