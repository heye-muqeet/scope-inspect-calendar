#!/bin/bash
# Script to update main branch with latest build from development
# Usage: ./update-main.sh [commit-message]

set -e  # Exit on error

COMMIT_MESSAGE="${1:-chore: update build files from development}"

echo "========================================"
echo "Updating Main Branch with Latest Build"
echo "========================================"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository!"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Step 1: Ensure we're on development branch
if [ "$CURRENT_BRANCH" != "development" ]; then
    echo "Switching to development branch..."
    git checkout development
fi

# Step 2: Pull latest changes
echo "Pulling latest changes from origin/development..."
git pull origin development || echo "Warning: Failed to pull latest changes. Continuing anyway..."

# Step 3: Build the package
echo "Building package..."
bun run build

# Verify dist folder exists
if [ ! -d "dist" ]; then
    echo "Error: dist/ folder not found after build!"
    exit 1
fi

echo "Build successful!"
echo ""

# Step 4: Switch to main branch
echo "Switching to main branch..."
git checkout main

# Step 5: Copy files from development
echo "Copying build files from development..."
git checkout development -- dist/ LICENSE README.md package.json

# Step 5.1: Clean package.json for main branch (remove dev scripts and devDependencies)
echo "Cleaning package.json for package-only branch..."

# Check if node/npm is available for JSON manipulation
if command -v node &> /dev/null; then
    # Use node to clean package.json
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.scripts = {};
    delete pkg.devDependencies;
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    " && echo "✓ Cleaned package.json (removed dev scripts and devDependencies)" || echo "Warning: Failed to clean package.json. Continuing with original..."
elif command -v python3 &> /dev/null; then
    # Fallback to python if node is not available
    python3 << 'PYTHON_SCRIPT'
import json
import sys

try:
    with open('package.json', 'r') as f:
        pkg = json.load(f)
    
    pkg['scripts'] = {}
    if 'devDependencies' in pkg:
        del pkg['devDependencies']
    
    with open('package.json', 'w') as f:
        json.dump(pkg, f, indent=2)
        f.write('\n')
    
    print("✓ Cleaned package.json (removed dev scripts and devDependencies)")
except Exception as e:
    print(f"Warning: Failed to clean package.json: {e}")
    print("Continuing with original package.json...")
PYTHON_SCRIPT
else
    echo "Warning: Neither node nor python3 found. Cannot clean package.json automatically."
    echo "Please manually remove dev scripts and devDependencies from package.json"
fi

# Step 6: Stage files
echo "Staging files..."
git add dist/ LICENSE README.md package.json

# Step 7: Check if there are changes to commit
if [ -z "$(git status --short)" ]; then
    echo "No changes to commit. Build files are already up to date."
    git checkout development
    exit 0
fi

# Step 8: Commit
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE" --no-verify

# Step 9: Push to main
echo "Pushing to origin/main..."
git push origin main

# Step 10: Switch back to development
echo "Switching back to development branch..."
git checkout development

echo ""
echo "========================================"
echo "Success! Main branch updated."
echo "========================================"

