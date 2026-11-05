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
