#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")"

echo "Installing the pinned olympus-v3 source..."
forge soldeer update
project="$PWD/dependencies/olympus-v3-1.0.0"

# Documentation needs Solidity imports, but none of V3's Node development tools,
# submodule setup, compiler downloads, or build artifacts.
echo "Installing Solidity dependencies..."
(cd "$project" && forge soldeer install)

echo "Generating Forge documentation..."
forge doc --root "$project"

echo "Converting Forge pages for Docusaurus..."
node scripts/convert-contract-docs.mjs \
  "$project/docs/src/pages" docs/contracts/02_docs "$project"

echo "Formatting and checking contract documentation..."
pnpm exec rumdl fmt docs/contracts/02_docs/
pnpm exec rumdl check --config .markdownlint-contracts.json --fix docs/contracts/02_docs/

echo "Contract documentation is available in docs/contracts/02_docs/"
