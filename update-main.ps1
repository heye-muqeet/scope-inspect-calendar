# Script to update main branch with latest build from development
# Usage: .\update-main.ps1 [commit-message]

param(
    [string]$CommitMessage = "chore: update build files from development"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Updating Main Branch with Latest Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not in a git repository!" -ForegroundColor Red
    exit 1
}

# Get current branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

# Step 1: Ensure we're on development branch
if ($currentBranch -ne "development") {
    Write-Host "Switching to development branch..." -ForegroundColor Yellow
    git checkout development
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to checkout development branch!" -ForegroundColor Red
        exit 1
    }
}

# Step 2: Pull latest changes
Write-Host "Pulling latest changes from origin/development..." -ForegroundColor Yellow
git pull origin development
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Failed to pull latest changes. Continuing anyway..." -ForegroundColor Yellow
}

# Step 3: Build the package
Write-Host "Building package..." -ForegroundColor Yellow
bun run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed! Please fix build errors before updating main." -ForegroundColor Red
    exit 1
}

# Verify dist folder exists
if (-not (Test-Path "dist")) {
    Write-Host "Error: dist/ folder not found after build!" -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""

# Step 4: Store current directory and copy dist folder to temp location
Write-Host "Preparing build files..." -ForegroundColor Yellow
$tempDist = Join-Path $env:TEMP "scope-inspect-calendar-dist-$(Get-Date -Format 'yyyyMMddHHmmss')"
if (Test-Path $tempDist) {
    Remove-Item -Path $tempDist -Recurse -Force
}
Copy-Item -Path "dist" -Destination $tempDist -Recurse -Force
Write-Host "Build files prepared in temp location" -ForegroundColor Green

# Step 5: Switch to main branch
Write-Host "Switching to main branch..." -ForegroundColor Yellow
git checkout main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to checkout main branch!" -ForegroundColor Red
    Remove-Item -Path $tempDist -Recurse -Force -ErrorAction SilentlyContinue
    git checkout development
    exit 1
}

# Step 6: Copy files to main branch
Write-Host "Copying build files to main branch..." -ForegroundColor Yellow

# Remove existing dist if it exists
if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
}

# Copy dist from temp location
Copy-Item -Path $tempDist -Destination "dist" -Recurse -Force

# Copy other files from development branch (these are tracked in git)
git checkout development -- LICENSE README.md package.json
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to copy files from development!" -ForegroundColor Red
    Remove-Item -Path $tempDist -Recurse -Force -ErrorAction SilentlyContinue
    git checkout development
    exit 1
}

# Clean up temp directory
Remove-Item -Path $tempDist -Recurse -Force -ErrorAction SilentlyContinue

# Step 7: Clean package.json for main branch (remove dev scripts and devDependencies)
Write-Host "Cleaning package.json for package-only branch..." -ForegroundColor Yellow

try {
    # Read package.json
    $packageJsonContent = Get-Content "package.json" -Raw
    $packageJson = $packageJsonContent | ConvertFrom-Json

    # Remove dev scripts (keep only empty scripts object)
    $packageJson.scripts = @{}

    # Remove devDependencies
    if ($packageJson.PSObject.Properties.Name -contains "devDependencies") {
        $packageJson.PSObject.Properties.Remove("devDependencies")
    }

    # Convert back to JSON with proper formatting (indented)
    $packageJsonJson = $packageJson | ConvertTo-Json -Depth 10

    # Write cleaned package.json (ensure proper formatting)
    $packageJsonJson.TrimEnd() | Set-Content "package.json" -Encoding UTF8

    Write-Host "[OK] Cleaned package.json (removed dev scripts and devDependencies)" -ForegroundColor Green
} catch {
    Write-Host "Warning: Failed to clean package.json: $_" -ForegroundColor Yellow
    Write-Host "Continuing with original package.json..." -ForegroundColor Yellow
}

# Step 8: Stage files
Write-Host "Staging files..." -ForegroundColor Yellow
git add dist/ LICENSE README.md package.json
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to stage files!" -ForegroundColor Red
    git checkout development
    exit 1
}

# Step 9: Check if there are changes to commit
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit. Build files are already up to date." -ForegroundColor Yellow
    git checkout development
    exit 0
}

# Step 10: Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m $CommitMessage --no-verify
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to commit!" -ForegroundColor Red
    git checkout development
    exit 1
}

# Step 11: Push to main
Write-Host "Pushing to origin/main..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to push to origin/main!" -ForegroundColor Red
    Write-Host "You may need to force push or check your permissions." -ForegroundColor Yellow
    git checkout development
    exit 1
}

# Step 12: Switch back to development
Write-Host "Switching back to development branch..." -ForegroundColor Yellow
git checkout development

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Success! Main branch updated." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
