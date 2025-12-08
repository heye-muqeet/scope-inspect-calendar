# NPM PAT Installation Guide

Complete step-by-step guide for installing this package from a **private GitHub repository** using **Personal Access Token (PAT)** with **npm**.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Personal Access Token](#step-1-create-personal-access-token)
3. [Step 2: Install Package Using PAT](#step-2-install-package-using-pat)
4. [Step 3: Secure Token Storage](#step-3-secure-token-storage)
5. [Step 4: Team Setup](#step-4-team-setup)
6. [Step 5: CI/CD Setup](#step-5-cicd-setup)
7. [Updating the Package](#updating-the-package)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ GitHub account with access to the private repository
- ✅ npm installed (version 6.0.0 or higher)
- ✅ Node.js installed
- ✅ Access to the private repository: `heye-muqeet/scope-inspect-calendar`

---

## Step 1: Create Personal Access Token

### 1.1 Navigate to GitHub Settings

1. Go to [GitHub.com](https://github.com) and sign in
2. Click your profile picture (top right)
3. Click **Settings**
4. Scroll down and click **Developer settings** (left sidebar)
5. Click **Personal access tokens** → **Tokens (classic)**

### 1.2 Generate New Token

1. Click **Generate new token** → **Generate new token (classic)**
2. **Note**: Give it a descriptive name, e.g., `Calendar Package Access - npm`
3. **Expiration**: Choose expiration period:
   - **30 days** (for testing)
   - **90 days** (for development)
   - **No expiration** (for production - use with caution)
4. **Select scopes**: Check the following:
   - ✅ **`repo`** (Full control of private repositories)
     - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
5. Click **Generate token** (scroll to bottom)
6. **⚠️ IMPORTANT**: Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again
   - Store it securely (password manager recommended)

---

## Step 2: Install Package Using PAT with Environment Variable (Recommended)

This is the **recommended method** that allows you to commit `.npmrc` to git safely.

### Why Use Environment Variables?

✅ **Benefits:**

- `.npmrc` can be committed to git (no tokens in files)
- Tokens stored securely in environment variables
- Team members use their own tokens
- Works seamlessly in CI/CD pipelines
- No risk of accidentally committing tokens

---

### Step 2.1: Set Environment Variable

Set the `GITHUB_TOKEN` environment variable with your Personal Access Token.

#### Windows (PowerShell)

**For current session only:**

```powershell
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Permanently (User-level - Recommended):**

```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'User')
```

**After setting permanently, restart your terminal/PowerShell for it to take effect.**

#### Windows (Command Prompt)

```cmd
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Note:** You'll need to open a new command prompt for the variable to be available.

#### Linux/Mac

**For current session:**

```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Permanently (add to shell profile):**

**For Bash:**

```bash
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
source ~/.bashrc
```

**For Zsh:**

```bash
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc
```

#### Verify Environment Variable is Set

**Windows PowerShell:**

```powershell
echo $env:GITHUB_TOKEN
```

**Linux/Mac:**

```bash
echo $GITHUB_TOKEN
```

You should see your token (starting with `ghp_`).

---

### Step 2.2: Create .npmrc File with Environment Variable

Create a `.npmrc` file in your **project root** directory with this content:

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**Create the file:**

**Windows (PowerShell):**

```powershell
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=`${GITHUB_TOKEN}" > .npmrc
```

**Linux/Mac:**

```bash
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=\${GITHUB_TOKEN}" > .npmrc
```

**Or manually create `.npmrc` file:**

Create a new file named `.npmrc` in your project root with exactly this content:

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**Important Notes:**

- The `${GITHUB_TOKEN}` syntax tells npm to read from the environment variable
- **DO NOT** replace `${GITHUB_TOKEN}` with your actual token
- This file is **safe to commit to git** because it contains no actual tokens

---

### Step 2.3: Commit .npmrc to Git (Safe!)

Since `.npmrc` only contains an environment variable reference (not the actual token), it's **safe to commit**:

```bash
git add .npmrc
git commit -m "chore: add npmrc configuration for private package"
git push
```

**✅ This is safe because:**

- No actual token is in the file
- Each developer sets their own `GITHUB_TOKEN` environment variable
- CI/CD can use secrets for the environment variable

**⚠️ Do NOT add `.npmrc` to `.gitignore`** when using this method (unless you want each developer to create their own).

---

### Step 2.4: Install Package

Now install the package normally:

```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

npm will automatically:

1. Read `.npmrc` file
2. Find `${GITHUB_TOKEN}` reference
3. Replace it with the value from your environment variable
4. Use the token for authentication

---

### Alternative: Direct URL with Token (Not Recommended)

**⚠️ Only use for quick testing, NOT for production:**

```bash
npm install git+https://YOUR_TOKEN@github.com/heye-muqeet/scope-inspect-calendar.git#main
```

**This method exposes the token in:**

- Command history
- `package.json` (if saved)
- `package-lock.json`

**Not recommended!**

---

## Step 3: Secure Token Storage

### Option 1: Password Manager (Recommended)

Store your PAT in a password manager:

- **1Password**
- **LastPass**
- **Bitwarden**
- **KeePass**

### Option 2: System Keychain

**Windows:**

- Use **Windows Credential Manager**
- Store as "Generic Credential"

**Mac:**

- Use **Keychain Access**
- Store as "Internet Password"

**Linux:**

- Use **libsecret** or **GNOME Keyring**

### Option 3: Encrypted File

```bash
# Encrypt token file
echo "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" | openssl enc -aes-256-cbc -salt -out token.enc

# Decrypt when needed
openssl enc -aes-256-cbc -d -in token.enc
```

---

## Step 4: Team Setup

### For Team Members

Each team member needs to:

1. **Create their own PAT** (don't share tokens!)
2. **Set up `.npmrc`** in their project:

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

3. **Set environment variable** on their machine
4. **Add `.npmrc` to `.gitignore`** (if it contains tokens)

### Shared Project Setup

**The `.npmrc` file is already in the repository** (using environment variable method):

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**Instructions for team members:**

1. **Clone the repository** (`.npmrc` is already included)
2. **Set `GITHUB_TOKEN` environment variable** on their machine:
   ```powershell
   # Windows PowerShell
   [System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'their_token_here', 'User')
   ```
   ```bash
   # Linux/Mac
   echo 'export GITHUB_TOKEN="their_token_here"' >> ~/.bashrc
   source ~/.bashrc
   ```
3. **Restart terminal** (if set permanently)
4. **Run `npm install`** - it will automatically use their token from environment variable

**Each team member:**

- Uses their own GitHub account
- Creates their own PAT
- Sets their own `GITHUB_TOKEN` environment variable
- Shares the same `.npmrc` file (committed to git)

---

## Step 5: CI/CD Setup

### GitHub Actions

**Option 1: Using GitHub Secrets**

1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GITHUB_TOKEN`
4. Value: Your PAT
5. Click **Add secret**

**In workflow file (`.github/workflows/ci.yml`):**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Configure npm for private repo
        run: |
          echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

**Option 2: Using GITHUB_TOKEN (Built-in)**

GitHub Actions provides a built-in token, but it may not have access to private repos. Use a PAT instead.

### Other CI/CD Platforms

**GitLab CI:**

```yaml
install:
  script:
    - echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=$GITHUB_TOKEN" >> .npmrc
    - npm install
  variables:
    GITHUB_TOKEN: $GITHUB_TOKEN # Set in GitLab CI/CD variables
```

**Jenkins:**

```groovy
pipeline {
    environment {
        GITHUB_TOKEN = credentials('github-token')
    }
    stages {
        stage('Install') {
            steps {
                sh '''
                    echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=$GITHUB_TOKEN" >> .npmrc
                    npm install
                '''
            }
        }
    }
}
```

**CircleCI:**

```yaml
jobs:
  build:
    steps:
      - run:
          name: Install dependencies
          command: |
            echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=$GITHUB_TOKEN" >> .npmrc
            npm install
```

---

## Complete Installation Example

### Fresh Project Setup

```bash
# 1. Create new project
mkdir my-app
cd my-app
npm init -y

# 2. Set environment variable permanently (Windows PowerShell)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'User')

# Or for Linux/Mac:
# echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
# source ~/.bashrc

# 3. Restart terminal (if set permanently) or use current session:
# Windows PowerShell: $env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# Linux/Mac: export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 4. Create .npmrc with environment variable reference
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=\${GITHUB_TOKEN}" > .npmrc

# 5. Verify .npmrc content (should show ${GITHUB_TOKEN}, NOT your actual token)
cat .npmrc

# 6. Commit .npmrc to git (it's safe - no token in file)
git add .npmrc
git commit -m "chore: add npmrc for private package installation"

# 7. Install package
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main

# 8. Install peer dependencies
npm install react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# 9. Verify installation
npm list scope-inspect-calendar
```

### package.json Result

After installation, your `package.json` will have:

```json
{
  "dependencies": {
    "scope-inspect-calendar": "git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main"
  }
}
```

**Note**: The token is NOT stored in `package.json` - it's only in `.npmrc` or environment variable.

---

## Troubleshooting

### Issue: "Repository not found" or "404 Not Found"

**Causes:**

- Token doesn't have `repo` scope
- Token is expired
- Repository is private and token doesn't have access
- Wrong repository URL

**Solutions:**

1. Verify token has `repo` scope in GitHub settings
2. Check token expiration date
3. Ensure you have access to the repository
4. Verify repository URL is correct

### Issue: "Authentication failed"

**Causes:**

- Invalid token
- Token revoked
- Wrong token format

**Solutions:**

1. Generate a new token
2. Verify token format: `ghp_` followed by 36 characters
3. Check token hasn't been revoked in GitHub settings

### Issue: "Token exposed in package-lock.json"

**Solution:**

- This shouldn't happen with `.npmrc` method
- If using URL method, switch to `.npmrc`
- If already exposed, rotate the token immediately

### Issue: "Cannot find module 'scope-inspect-calendar'"

**Causes:**

- Package not installed
- Wrong branch specified
- Build files missing in main branch

**Solutions:**

1. Run `npm install` again
2. Verify you're using `#main` branch
3. Check that `dist/` folder exists in main branch

### Issue: Environment variable not working

**Solutions:**

1. **Verify variable is set:**
   - Linux/Mac: `echo $GITHUB_TOKEN`
   - Windows PowerShell: `echo $env:GITHUB_TOKEN`
   - Should output your token (starting with `ghp_`)

2. **If variable is not set:**
   - Restart terminal after setting permanent variable
   - Or set for current session: `$env:GITHUB_TOKEN = "your_token"` (PowerShell) or `export GITHUB_TOKEN="your_token"` (Linux/Mac)

3. **Verify `.npmrc` syntax:**
   - Should be: `_authToken=${GITHUB_TOKEN}` (with `${}`)
   - NOT: `_authToken=$GITHUB_TOKEN` (missing `${}`)
   - NOT: `_authToken=ghp_xxx...` (actual token)

4. **Check npm can read environment variable:**

   ```bash
   # Test if npm can access it
   npm config get //github.com/heye-muqeet/scope-inspect-calendar.git:_authToken
   ```

5. **If still not working, verify `.npmrc` file location:**
   - Should be in project root (same directory as `package.json`)
   - Check file encoding (should be UTF-8)

---

## Best Practices

### ✅ DO:

1. **Use environment variables** for tokens (allows committing `.npmrc` to git)
2. **Commit `.npmrc` to git** when using `${GITHUB_TOKEN}` (it's safe!)
3. **Set `GITHUB_TOKEN` permanently** in your system environment
4. **Rotate tokens regularly** (every 90 days recommended)
5. **Use minimal scopes** (only `repo` scope needed)
6. **Store tokens in password manager** for backup
7. **Use different tokens** for different projects
8. **Revoke tokens** when no longer needed
9. **Verify `.npmrc` doesn't contain actual tokens** before committing

### ❌ DON'T:

1. **Put actual tokens in `.npmrc`** (use `${GITHUB_TOKEN}` instead)
2. **Commit `.npmrc` with hardcoded tokens** (check before committing!)
3. **Share tokens** in chat, email, or documents
4. **Use same token** for multiple projects
5. **Use tokens with excessive permissions**
6. **Hardcode tokens** in code or config files
7. **Store tokens in plain text files** (use environment variables)
8. **Use expired tokens**
9. **Ignore security warnings**
10. **Add `.npmrc` to `.gitignore`** when using environment variables (it's safe to commit)

---

## Updating the Package

When you push new functionality to the GitHub repository, you need to update the package in your projects to get the latest changes.

### Understanding Git-Based Package Updates

Since this package is installed from a Git repository (`git+https://...`), npm doesn't automatically check for updates like it does with npm registry packages. You need to explicitly update it.

### Method 1: Update to Latest Main Branch (Recommended)

This updates to the latest commit on the `main` branch:

```bash
npm update scope-inspect-calendar
```

**Note:** If `npm update` doesn't work (npm sometimes caches git dependencies), use Method 2.

### Method 2: Force Reinstall (Most Reliable)

This removes the old version and installs fresh from the latest `main` branch:

```bash
npm uninstall scope-inspect-calendar
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

**Or in one command:**

```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
```

### Method 3: Update with Cache Clear

If you suspect npm is using a cached version:

```bash
# Clear npm cache for this package
npm cache clean --force

# Then update
npm update scope-inspect-calendar

# Or reinstall
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
```

### Method 4: Update to Specific Commit/Branch/Tag

If you want to update to a specific version:

**Update to specific commit:**
```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#abc123def456
```

**Update to specific branch:**
```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#develop
```

**Update to specific tag:**
```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#v1.2.3
```

### Checking Current Version

**Check installed version:**
```bash
npm list scope-inspect-calendar
```

**Check package details:**
```bash
npm info scope-inspect-calendar
```

**Check what commit you're using:**
```bash
# View package.json
cat node_modules/scope-inspect-calendar/package.json | grep version

# Or check the git commit in node_modules
cd node_modules/scope-inspect-calendar
git log -1
cd ../..
```

### Checking for Updates

**Method 1: Check GitHub directly**
1. Visit: `https://github.com/heye-muqeet/scope-inspect-calendar`
2. Check the latest commit on `main` branch
3. Compare with your installed version

**Method 2: Check via npm (if package.json has version)**
```bash
npm outdated scope-inspect-calendar
```

**Method 3: Check commit hash**
```bash
# Get your current commit
cd node_modules/scope-inspect-calendar
git rev-parse HEAD
cd ../..

# Compare with latest on GitHub
# Visit: https://api.github.com/repos/heye-muqeet/scope-inspect-calendar/commits/main
```

### Complete Update Workflow

**Step-by-step process:**

```bash
# 1. Check current version/commit
npm list scope-inspect-calendar

# 2. (Optional) Check for changes on GitHub
# Visit: https://github.com/heye-muqeet/scope-inspect-calendar/commits/main

# 3. Update the package
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force

# 4. Verify new version is installed
npm list scope-inspect-calendar

# 5. Test your application
npm run dev
# or
npm start
```

### Updating in Multiple Projects

If you're using the package in multiple projects:

**Option 1: Update each project individually**
```bash
# In each project directory
cd project-1
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force

cd ../project-2
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
```

**Option 2: Use a script (PowerShell)**
```powershell
# update-packages.ps1
$projects = @("project-1", "project-2", "project-3")

foreach ($project in $projects) {
    Write-Host "Updating $project..."
    Set-Location $project
    npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
    Set-Location ..
    Write-Host "Updated $project`n"
}
```

**Option 2: Use a script (Bash)**
```bash
#!/bin/bash
# update-packages.sh
projects=("project-1" "project-2" "project-3")

for project in "${projects[@]}"; do
    echo "Updating $project..."
    cd "$project"
    npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
    cd ..
    echo "Updated $project\n"
done
```

### Handling Breaking Changes

When updating, if you encounter errors:

**1. Check the changelog/commits:**
```bash
# View recent commits on GitHub
# https://github.com/heye-muqeet/scope-inspect-calendar/commits/main
```

**2. Review breaking changes:**
- Check commit messages
- Review pull requests
- Check if there's a CHANGELOG.md or RELEASE_NOTES.md

**3. Update your code accordingly:**
- Update imports if API changed
- Update props/usage if component API changed
- Check TypeScript errors for type changes

**4. Rollback if needed:**
```bash
# Install previous commit
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#previous-commit-hash
```

### Best Practices for Updating

**✅ DO:**

1. **Test after updating** - Always test your application after updating
2. **Check commit history** - Review what changed before updating
3. **Update regularly** - Don't let versions get too far behind
4. **Use version control** - Commit `package-lock.json` after updates
5. **Update in development first** - Test updates in dev before production
6. **Keep backups** - Know which commit works if you need to rollback

**❌ DON'T:**

1. **Update without testing** - Always test after updating
2. **Update in production first** - Test in development environment
3. **Ignore breaking changes** - Read commit messages and changelogs
4. **Skip version control** - Always commit `package-lock.json`
5. **Update blindly** - Know what you're updating to

### Automated Update Notifications

**Option 1: GitHub Watch**
- Go to repository → Click "Watch" → Select "All activity"
- Get email notifications for new commits

**Option 2: GitHub Actions (for your projects)**
Create a workflow that checks for updates:

```yaml
# .github/workflows/check-updates.yml
name: Check Package Updates

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Check for updates
        run: |
          npm install
          npm outdated scope-inspect-calendar || echo "No updates available"
```

### Troubleshooting Updates

**Issue: "npm update" doesn't update the package**

**Solution:**
```bash
# Force reinstall
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
```

**Issue: "Still seeing old code after update"**

**Solutions:**
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Restart your dev server
4. Clear browser cache if using in browser

**Issue: "Getting errors after update"**

**Solutions:**
1. Check commit history for breaking changes
2. Review your code for deprecated APIs
3. Check TypeScript errors for type mismatches
4. Rollback to previous working commit if needed

### Version Pinning (Optional)

If you want to pin to a specific commit for stability:

**In package.json:**
```json
{
  "dependencies": {
    "scope-inspect-calendar": "git+https://github.com/heye-muqeet/scope-inspect-calendar.git#abc123def456"
  }
}
```

**Benefits:**
- Predictable builds
- No unexpected updates
- Easier debugging

**Drawbacks:**
- Manual updates required
- Missing bug fixes and features

---

## Verifying Installation

### Check Installation

```bash
# List installed version
npm list scope-inspect-calendar

# Check package details
npm info scope-inspect-calendar
```

### Test Import

```javascript
// test.js
const { IlamyCalendar } = require('scope-inspect-calendar')
console.log('Package installed successfully!')
```

Run: `node test.js`

---

## Security Checklist

Before going to production:

- [ ] Token has only `repo` scope (minimal permissions)
- [ ] `.npmrc` uses `${GITHUB_TOKEN}` (environment variable, NOT actual token)
- [ ] `.npmrc` is committed to git (verify it doesn't contain actual token)
- [ ] `GITHUB_TOKEN` environment variable is set on your system
- [ ] Token is stored securely (password manager/keychain for backup)
- [ ] Environment variables are used (not hardcoded in files)
- [ ] Team members have their own tokens and environment variables
- [ ] CI/CD uses secrets for `GITHUB_TOKEN` environment variable
- [ ] Token rotation schedule is set
- [ ] Old/unused tokens are revoked
- [ ] Verified `.npmrc` content before committing (should show `${GITHUB_TOKEN}`)

---

## Quick Reference

### Setup (One-time)

```bash
# 1. Set environment variable PERMANENTLY
# Windows PowerShell:
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'User')

# Linux/Mac:
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
source ~/.bashrc

# 2. Restart terminal (if set permanently)

# 3. Create .npmrc with environment variable reference
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=\${GITHUB_TOKEN}" > .npmrc

# 4. Verify .npmrc (should show ${GITHUB_TOKEN}, NOT actual token)
cat .npmrc

# 5. Commit .npmrc to git (SAFE - no token in file)
git add .npmrc
git commit -m "chore: add npmrc configuration"

# 6. Install package
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

**Important:**

- ✅ `.npmrc` with `${GITHUB_TOKEN}` is **safe to commit**
- ❌ `.npmrc` with actual token (`ghp_xxx...`) should **NOT be committed**
- ✅ Each developer sets their own `GITHUB_TOKEN` environment variable

### Daily Usage

```bash
# Just install/update normally
npm install
npm update scope-inspect-calendar
```

---

## Summary

**Recommended Setup (Allows Committing .npmrc to Git):**

1. **Create PAT** with `repo` scope
2. **Set `GITHUB_TOKEN` environment variable** permanently on your system
3. **Create `.npmrc`** with `${GITHUB_TOKEN}` (environment variable reference)
4. **Verify `.npmrc`** doesn't contain actual token (should show `${GITHUB_TOKEN}`)
5. **Commit `.npmrc` to git** (it's safe - no token in the file)
6. **Install package** normally - npm will read token from environment variable

**Key Benefits:**

- ✅ `.npmrc` can be committed to git (no tokens in files)
- ✅ Each developer uses their own token via environment variable
- ✅ CI/CD can use secrets for environment variables
- ✅ No risk of accidentally committing tokens
- ✅ Team shares the same `.npmrc` file

**What gets committed:**

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**What stays secure:**

- Actual token is only in environment variable (not in any file)
- Each developer/CI system sets their own `GITHUB_TOKEN`
