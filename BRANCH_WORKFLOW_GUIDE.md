# Branch Workflow Guide

## Overview

This project uses a two-branch strategy:

- **`development`**: Full source code for development
- **`main`**: Package-only branch containing only build artifacts and essential files

## Branch Structure

### Development Branch
Contains:
- All source files (`src/`, `examples/`, `docs/`, etc.)
- Configuration files (`.tsconfig.json`, `bunup.config.ts`, etc.)
- Development dependencies and tools
- Full `.gitignore` for development

### Main Branch (Package-Only)
Contains only:
- `dist/` - Built package files
- `LICENSE` - License file
- `README.md` - Package documentation
- `package.json` - Package metadata
- `.gitignore` - Package-only ignore rules

## Workflow: Updating Main with New Build

### Step 1: Develop and Build in Development Branch

```bash
# 1. Switch to development branch
git checkout development

# 2. Make your changes, develop features, etc.
# ... your development work ...

# 3. Build the package
bun run build

# 4. Verify the build was successful
# Check that dist/ folder contains the latest build files
```

### Step 2: Commit Build Files to Development (Optional)

```bash
# If you want to track build files in development branch
git add dist/
git commit -m "build: update dist files"
git push origin development
```

**Note**: You can skip this step if you don't want to track `dist/` in development branch.

### Step 3: Update Main Branch with New Build

#### Method A: Automated Script (Recommended)

Create a script `update-main.sh` (or `update-main.ps1` for Windows):

**For Windows (PowerShell):**
```powershell
# update-main.ps1
Write-Host "Building package..."
bun run build

Write-Host "Switching to main branch..."
git checkout main

Write-Host "Copying build files..."
Copy-Item -Path "dist" -Destination "." -Recurse -Force
Copy-Item -Path "LICENSE" -Destination "." -Force
Copy-Item -Path "README.md" -Destination "." -Force
Copy-Item -Path "package.json" -Destination "." -Force

Write-Host "Staging files..."
git add dist/ LICENSE README.md package.json

Write-Host "Committing..."
git commit -m "chore: update build files from development"

Write-Host "Pushing to origin/main..."
git push origin main

Write-Host "Switching back to development..."
git checkout development

Write-Host "Done! Main branch updated."
```

**For Unix/Mac (Bash):**
```bash
#!/bin/bash
# update-main.sh

echo "Building package..."
bun run build

echo "Switching to main branch..."
git checkout main

echo "Copying build files..."
cp -r dist/ .
cp LICENSE .
cp README.md .
cp package.json .

echo "Staging files..."
git add dist/ LICENSE README.md package.json

echo "Committing..."
git commit -m "chore: update build files from development"

echo "Pushing to origin/main..."
git push origin main

echo "Switching back to development..."
git checkout development

echo "Done! Main branch updated."
```

#### Method B: Manual Steps

```bash
# 1. Ensure you're on development branch and have latest build
git checkout development
bun run build

# 2. Switch to main branch
git checkout main

# 3. Copy build files from development
# On Windows (PowerShell):
git checkout development -- dist/ LICENSE README.md package.json

# On Unix/Mac:
git checkout development -- dist/ LICENSE README.md package.json

# 4. Stage the files
git add dist/ LICENSE README.md package.json

# 5. Commit
git commit -m "chore: update build files from development [version]"

# 6. Push to main
git push origin main

# 7. Switch back to development
git checkout development
```

### Step 4: Tag the Release (Optional but Recommended)

```bash
# After updating main, create a version tag
git checkout main
git tag -a v1.1.3 -m "Release version 1.1.3"
git push origin main --tags

# Switch back to development
git checkout development
```

## Quick Reference Commands

### Build and Update Main (One-liner)

**Windows PowerShell:**
```powershell
git checkout development; bun run build; git checkout main; git checkout development -- dist/ LICENSE README.md package.json; git add dist/ LICENSE README.md package.json; git commit -m "chore: update build files"; git push origin main; git checkout development
```

**Unix/Mac:**
```bash
git checkout development && bun run build && git checkout main && git checkout development -- dist/ LICENSE README.md package.json && git add dist/ LICENSE README.md package.json && git commit -m "chore: update build files" && git push origin main && git checkout development
```

## Best Practices

1. **Always build before updating main**: Ensure `bun run build` completes successfully
2. **Version your releases**: Update `package.json` version before building
3. **Test the build**: Verify `dist/` contains expected files
4. **Use descriptive commit messages**: Include version number in commit message
5. **Tag releases**: Create git tags for each release version
6. **Keep main clean**: Only package files should be in main branch

## Troubleshooting

### Issue: Main branch has extra files
```bash
# Clean main branch (removes all non-package files)
git checkout main
git rm -r --cached .
git reset HEAD .gitignore dist/ LICENSE README.md package.json
git add .gitignore dist/ LICENSE README.md package.json
git commit -m "chore: clean main branch"
git push origin main --force
```

### Issue: Build files are outdated
```bash
# Rebuild and update
git checkout development
bun run build
git checkout main
git checkout development -- dist/
git add dist/
git commit -m "chore: update dist files"
git push origin main
```

## Example Workflow

```bash
# 1. Start development
git checkout development
git pull origin development

# 2. Create feature branch (optional)
git checkout -b feature/new-calendar-view

# 3. Make changes and test
# ... code changes ...

# 4. Build and test
bun run build
bun test

# 5. Commit changes
git add .
git commit -m "feat: add new calendar view"
git push origin feature/new-calendar-view

# 6. Merge to development (after PR review)
git checkout development
git merge feature/new-calendar-view
git push origin development

# 7. Update main with new build
git checkout main
git checkout development -- dist/ LICENSE README.md package.json
git add dist/ LICENSE README.md package.json
git commit -m "chore: update build files v1.1.3"
git push origin main

# 8. Tag release
git tag -a v1.1.3 -m "Release v1.1.3"
git push origin main --tags

# 9. Return to development
git checkout development
```

## Notes

- The `.gitignore` in main branch should only allow: `dist/`, `LICENSE`, `README.md`, `package.json`, `.gitignore`
- Never commit source files to main branch
- Always verify build before updating main
- Consider using GitHub Actions or CI/CD to automate this process

