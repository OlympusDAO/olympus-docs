#!/bin/bash

# Script to generate contract documentation from olympus-v3 repository

set -e  # Exit on any error

echo "🚀 Starting contract documentation generation..."

# Install forge dependencies
echo "🔨 Installing forge dependencies..."
forge soldeer update
echo

# Check if dependencies directory exists
if [ ! -d "dependencies/olympus-v3-1.0.0" ]; then
    echo "❌ Error: dependencies/olympus-v3-1.0.0 directory not found"
    exit 1
fi

# Navigate to olympus-v3 repository
echo "📁 Changing to olympus-v3 directory..."
cd dependencies/olympus-v3-1.0.0

# Build the project
echo "🔨 Building the project..."
pnpm install

# Generate forge documentation
echo "📝 Generating forge documentation..."
forge doc

# Check if docs directory was created
if [ ! -d "docs" ]; then
    echo "❌ Error: docs directory not found after forge doc"
    exit 1
fi

# Remove unnecessary directories before linting
echo "🧹 Removing unnecessary directories..."
rm -rf docs/src/src/scripts
rm -rf docs/src/src/test
rm -rf docs/src/README.md
echo "✅ Removed unnecessary directories"
echo

# Rename SUMMARY.md to 00_overview.md
echo "📄 Renaming SUMMARY.md to 00_overview.md..."
mv docs/src/SUMMARY.md docs/src/00_overview.md
echo "✅ Renamed SUMMARY.md to 00_overview.md"

# Navigate back to parent directory
echo "📁 Returning to parent directory..."
cd ../..
echo

# Clear the existing contract docs directory
echo "🧹 Clearing existing contract docs directory..."
if [ -d "docs/contracts/02_docs" ]; then
    rm -rf docs/contracts/02_docs/*
    echo "✅ Cleared existing contract docs directory"
else
    echo "📁 Creating contract docs directory..."
    mkdir -p docs/contracts/02_docs
fi
echo

# Copy the generated docs
echo "📋 Copying generated documentation..."
cp -r dependencies/olympus-v3-1.0.0/docs/src/* docs/contracts/02_docs/
echo

# Perform manual fixes
echo "🧹 Performing manual fixes..."
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' '/^\*$/d' {} \;
echo

# Remove scripts and test sections from 00_overview.md
echo "📝 Removing scripts and test sections from 00_overview.md..."
if [ -f "docs/contracts/02_docs/00_overview.md" ]; then
    # Remove all lines containing src/scripts/ or src/test/ references
    sed -i '' '/src\/scripts\//d' docs/contracts/02_docs/00_overview.md
    sed -i '' '/src\/test\//d' docs/contracts/02_docs/00_overview.md
    # Remove the empty section headers
    sed -i '' '/^- \[❱ scripts\]/d' docs/contracts/02_docs/00_overview.md
    sed -i '' '/^- \[❱ test\]/d' docs/contracts/02_docs/00_overview.md
fi
echo "✅ Removed scripts and test sections from 00_overview.md"
echo

# Remove scripts and test references from src/README.md
echo "📝 Removing scripts and test references from src/README.md..."
if [ -f "docs/contracts/02_docs/src/README.md" ]; then
    sed -i '' '/^- \[scripts\](\/src\/scripts)/d' docs/contracts/02_docs/src/README.md
    sed -i '' '/^- \[test\](\/src\/test)/d' docs/contracts/02_docs/src/README.md
fi
echo "✅ Removed scripts and test references from src/README.md"
echo

# Fix incorrect paths in markdown files
echo "🔧 Fixing incorrect paths in markdown files..."
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|/dependencies/openzeppelin-4.8.0/contracts/mocks/ERC20WrapperMock.sol/contract.ERC20WrapperMock.md|/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA.md|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|/dependencies/openzeppelin-4.8.0/contracts/utils/cryptography/ECDSA.sol/library.ECDSA.md|/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA.md|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|/dependencies/chainlink-ccip-1.6.0/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/utils/cryptography/ECDSA.sol/library.ECDSA.md|/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA.md|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|(/src/test/lib/zuniswapv2/ZuniswapV2Pair.sol/interface.IERC20.md)|(/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20.md)|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|(/src/test/lib/bonds/interfaces/IBondTeller.sol/interface.IBondTeller.md)|(/main/contracts/docs/src/interfaces/IBondTeller.sol/interface.IBondTeller.md)|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|(/src/test/lib/bonds/interfaces/IBondAuctioneer.sol/interface.IBondAuctioneer.md)|(/main/contracts/docs/src/interfaces/IBondAuctioneer.sol/interface.IBondAuctioneer.md)|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|(/src/test/lib/bonds/interfaces/IBondCallback.sol/interface.IBondCallback.md)|(/main/contracts/docs/src/interfaces/IBondCallback.sol/interface.IBondCallback.md)|g' {} \;
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|(/src/test/mocks/OlympusMocks.sol/interface.IDistributor.md)|(/main/contracts/docs/src/policies/interfaces/IDistributor.sol/interface.IDistributor.md)|g' {} \;
echo "✅ Fixed incorrect paths in markdown files"
echo

# Fix absolute paths in markdown files
echo "🔧 Fixing absolute paths in markdown files..."
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|](/src/|](/main/contracts/docs/src/|g' {} \;
echo "✅ Fixed absolute paths in markdown files"
echo

# Remove .md extensions from absolute links
echo "🔧 Removing .md extensions from absolute links..."
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|](/main/contracts/docs/\([^)]*\)\.md|](/main/contracts/docs/\1|g' {} \;
echo "✅ Removed .md extensions from absolute links"
echo

# Fix literal angle brackets in markdown files
echo "🔧 Fixing literal angle brackets in markdown files..."
find docs/contracts/02_docs -name "*.md" -type f -exec sed -i '' 's|<>|\\\\<\\\\>|g' {} \;
echo "✅ Fixed literal angle brackets in markdown files"
echo

# Remove Home link from 00_overview.md
echo "📝 Removing Home link from 00_overview.md..."
if [ -f "docs/contracts/02_docs/00_overview.md" ]; then
    sed -i '' '/^- \[Home\](README\.md)/d' docs/contracts/02_docs/00_overview.md
    echo "✅ Removed Home link from 00_overview.md"
fi

# Rename README.md files to index.md in subdirectories (for Docusaurus root pages)
echo "📝 Renaming README.md files to index.md in subdirectories..."
find docs/contracts/02_docs -name "README.md" -type f | while read -r file; do
    dir=$(dirname "$file")
    if [ "$dir" != "docs/contracts/02_docs" ]; then
        mv "$file" "$dir/index.md"
        echo "✅ Renamed $file to $dir/index.md"
    fi
done
echo "✅ Renamed README.md files to index.md in subdirectories"

# Update README.md references in renamed files
echo "📝 Updating README.md references in renamed files..."
find docs/contracts/02_docs -name "*.md" -type f | while read -r file; do
    sed -i '' 's|/README.md)|/)|g' "$file"
    echo "✅ Updated README.md references in $file"
done
echo "✅ Updated README.md references in renamed files"

# Update titles in nested index.md files
echo "📝 Updating titles in nested index.md files..."
find docs/contracts/02_docs -name "index.md" -type f | while read -r file; do
    dir=$(dirname "$file")
    if [ "$dir" != "docs/contracts/02_docs" ]; then
        # Extract directory name from path
        dir_name=$(basename "$dir")
        # Convert to title case (first letter uppercase, rest lowercase)
        title=$(echo "$dir_name" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')
        # Replace "# Contents" with "# <directory name>"
        sed -i '' 's/^# Contents$/# '"$title"'/' "$file"
        echo "✅ Updated title in $file to #$title"
    fi
done
echo "✅ Updated titles in nested index.md files"
echo "✅ Performed manual fixes"
echo

# Run markdownlint on the docs directory
echo "🔍 Running markdownlint on contract docs directory..."
npx markdownlint --config .markdownlint-contracts.json --fix docs/contracts/02_docs/ || echo "⚠️  Markdownlint had some issues that couldn't be auto-fixed"
echo "✅ Markdownlint completed"
echo

# Create _category_.json file
echo "📄 Creating category configuration..."
cat > docs/contracts/02_docs/_category_.json << 'EOF'
{
    "label": "Contract Documentation",
    "position": 1,
    "collapsed": true
}
EOF
echo

echo "✅ Contract documentation generation completed successfully!"
echo "📚 Documentation is now available in docs/contracts/02_docs/"
