#!/bin/bash

# Script to generate contract documentation from olympus-v3 repository

set -e  # Exit on any error

echo "🚀 Starting contract documentation generation..."

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
pnpm run build

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
if [ -d "docs/technical/01_contract-docs" ]; then
    rm -rf docs/technical/01_contract-docs/*
    echo "✅ Cleared existing contract docs directory"
else
    echo "📁 Creating contract docs directory..."
    mkdir -p docs/technical/01_contract-docs
fi
echo

# Copy the generated docs
echo "📋 Copying generated documentation..."
cp -r dependencies/olympus-v3-1.0.0/docs/src/* docs/technical/01_contract-docs/
echo

# Perform manual fixes
echo "🧹 Performing manual fixes..."
find docs/technical/01_contract-docs -name "*.md" -type f -exec sed -i '' '/^\*$/d' {} \;
echo "✅ Performed manual fixes"
echo

# Run markdownlint on the docs directory
echo "🔍 Running markdownlint on contract docs directory..."
npx markdownlint --config .markdownlint-contracts.json --fix docs/technical/01_contract-docs/ || echo "⚠️  Markdownlint had some issues that couldn't be auto-fixed"
echo "✅ Markdownlint completed"
echo

# Create _category_.json file
echo "📄 Creating category configuration..."
cat > docs/technical/01_contract-docs/_category_.json << 'EOF'
{
    "label": "Contract Documentation",
    "position": 1,
    "collapsed": true
}
EOF

echo "✅ Contract documentation generation completed successfully!"
echo "📚 Documentation is now available in docs/technical/01_contract-docs/"
