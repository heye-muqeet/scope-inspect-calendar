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
    if [ $? -ne 0 ]; then
        echo "Error: Failed to checkout development branch!"
        exit 1
    fi
    sleep 0.5
fi

# Step 2: Pull latest changes
echo "Pulling latest changes from origin/development..."
git pull origin development || echo "Warning: Failed to pull latest changes. Continuing anyway..."
sleep 0.8

# Step 3: Build the package
echo "Building package..."
bun run build
if [ $? -ne 0 ]; then
    echo "Error: Build failed! Please fix build errors before updating main."
    exit 1
fi

# Verify dist folder exists
if [ ! -d "dist" ]; then
    echo "Error: dist/ folder not found after build!"
    exit 1
fi

sleep 0.5
echo "Build successful!"
echo ""

# Step 4: Store current directory and copy dist folder to temp location
echo "Preparing build files..."
TEMP_DIST="/tmp/scope-inspect-calendar-dist-$(date +%Y%m%d%H%M%S)"
if [ -d "$TEMP_DIST" ]; then
    rm -rf "$TEMP_DIST"
    sleep 0.3
fi
cp -r dist "$TEMP_DIST"
sleep 0.8
echo "Build files prepared in temp location"

# Step 5: Switch to main branch
echo "Switching to main branch..."
# Force checkout to automatically handle file/directory deletions without prompts
git checkout -f main
if [ $? -ne 0 ]; then
    echo "Error: Failed to checkout main branch!"
    rm -rf "$TEMP_DIST" 2>/dev/null || true
    git checkout development
    exit 1
fi
sleep 0.8

# Step 6: Copy files to main branch
echo "Copying build files to main branch..."

# Remove existing dist if it exists
if [ -d "dist" ]; then
    rm -rf dist
    sleep 0.5
fi

# Copy dist from temp location
cp -r "$TEMP_DIST" dist
sleep 0.8

# Copy other files from development branch (these are tracked in git)
git checkout development -- LICENSE README.md package.json
if [ $? -ne 0 ]; then
    echo "Error: Failed to copy files from development!"
    rm -rf "$TEMP_DIST" 2>/dev/null || true
    git checkout development
    exit 1
fi
sleep 0.5

# Clean up temp directory
rm -rf "$TEMP_DIST" 2>/dev/null || true
sleep 0.3

# Step 7: Clean package.json for main branch (remove dev scripts and devDependencies)
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
    sleep 0.3
elif command -v python3 &> /dev/null; then
    # Fallback to python if node is not available
    python3 << 'PYTHON_SCRIPT'
import json
import sys
import time

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
    time.sleep(0.3)
except Exception as e:
    print(f"Warning: Failed to clean package.json: {e}")
    print("Continuing with original package.json...")
PYTHON_SCRIPT
else
    echo "Warning: Neither node nor python3 found. Cannot clean package.json automatically."
    echo "Please manually remove dev scripts and devDependencies from package.json"
fi

# Step 8: Stage files
echo "Staging files..."
git add dist/ LICENSE README.md package.json
if [ $? -ne 0 ]; then
    echo "Error: Failed to stage files!"
    git checkout development
    exit 1
fi
sleep 0.5

# Step 9: Check if there are changes to commit
STATUS=$(git status --short)
sleep 0.3
if [ -z "$STATUS" ]; then
    echo "No changes to commit. Build files are already up to date."
    git checkout development
    exit 0
fi

# Step 10: Commit
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE" --no-verify
if [ $? -ne 0 ]; then
    echo "Error: Failed to commit!"
    git checkout development
    exit 1
fi
sleep 0.5

# Step 11: Push to main
echo "Pushing to origin/main..."
git push origin main
if [ $? -ne 0 ]; then
    echo "Error: Failed to push to origin/main!"
    echo "You may need to force push or check your permissions."
    git checkout development
    exit 1
fi
sleep 1.0

# Step 12: Switch back to development
echo "Switching back to development branch..."
git checkout development
sleep 0.5

echo ""
echo "========================================"
echo "Success! Main branch updated."
echo "========================================"
