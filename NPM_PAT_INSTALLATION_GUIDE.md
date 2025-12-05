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
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

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

## Step 2: Install Package Using PAT

You have **three methods** to use PAT with npm. Choose the one that fits your needs:

### Method A: Direct URL with Token (Quick but Less Secure)

**One-time installation:**

```bash
npm install git+https://YOUR_TOKEN@github.com/heye-muqeet/scope-inspect-calendar.git#main
```

**Replace `YOUR_TOKEN` with your actual token:**

```bash
npm install git+https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/heye-muqeet/scope-inspect-calendar.git#main
```

**⚠️ Warning**: This method exposes the token in:
- Command history
- `package.json` (if saved)
- `package-lock.json`

**Not recommended for production!**

---

### Method B: Using .npmrc File (Recommended)

This is the **recommended method** for secure token storage.

#### Step 2.1: Create .npmrc File

Create a `.npmrc` file in your **project root** directory:

**Windows (PowerShell):**
```powershell
# Create .npmrc file
@echo off
echo //github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=YOUR_TOKEN > .npmrc
```

**Linux/Mac:**
```bash
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=YOUR_TOKEN" > .npmrc
```

**Or manually create `.npmrc` file with this content:**

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Step 2.2: Add .npmrc to .gitignore

**⚠️ CRITICAL**: Never commit `.npmrc` with tokens to git!

Add to your `.gitignore`:

```
# npm
.npmrc
```

Or if you want to commit `.npmrc` without the token, use environment variables (see Method C).

#### Step 2.3: Install Package

Now install normally:

```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

npm will automatically use the token from `.npmrc`.

---

### Method C: Using Environment Variable (Most Secure)

This method keeps tokens out of files entirely.

#### Step 2.1: Set Environment Variable

**Windows (PowerShell):**
```powershell
# Set for current session
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Set permanently (User-level)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'User')
```

**Windows (Command Prompt):**
```cmd
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Linux/Mac:**
```bash
# Set for current session
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Set permanently (add to ~/.bashrc or ~/.zshrc)
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
source ~/.bashrc
```

#### Step 2.2: Create .npmrc with Environment Variable

Create `.npmrc` file:

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**Note**: npm supports `${VAR_NAME}` syntax for environment variables.

#### Step 2.3: Install Package

```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

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

**Create `.npmrc.example` file** (commit this to git):

```
//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
```

**Instructions for team:**

1. Copy `.npmrc.example` to `.npmrc`
2. Set `GITHUB_TOKEN` environment variable
3. Run `npm install`

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
    GITHUB_TOKEN: $GITHUB_TOKEN  # Set in GitLab CI/CD variables
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

# 2. Set environment variable (Windows PowerShell)
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 3. Create .npmrc
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}" > .npmrc

# 4. Add .npmrc to .gitignore
echo ".npmrc" >> .gitignore

# 5. Install package
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main

# 6. Install peer dependencies
npm install react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# 7. Verify installation
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
1. Verify variable is set: `echo $GITHUB_TOKEN` (Linux/Mac) or `echo $env:GITHUB_TOKEN` (PowerShell)
2. Restart terminal after setting permanent variable
3. Use `.npmrc` method instead if environment variables don't work

---

## Best Practices

### ✅ DO:

1. **Use environment variables** for tokens
2. **Add `.npmrc` to `.gitignore`** if it contains tokens
3. **Rotate tokens regularly** (every 90 days recommended)
4. **Use minimal scopes** (only `repo` scope needed)
5. **Store tokens in password manager**
6. **Use different tokens** for different projects
7. **Revoke tokens** when no longer needed
8. **Use `.npmrc.example`** for team documentation

### ❌ DON'T:

1. **Commit tokens to git** (ever!)
2. **Share tokens** in chat, email, or documents
3. **Use same token** for multiple projects
4. **Use tokens with excessive permissions**
5. **Hardcode tokens** in code or config files
6. **Store tokens in plain text files**
7. **Use expired tokens**
8. **Ignore security warnings**

---

## Updating the Package

To update to the latest version:

```bash
npm update scope-inspect-calendar
```

Or reinstall:

```bash
npm uninstall scope-inspect-calendar
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

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
const { IlamyCalendar } = require('scope-inspect-calendar');
console.log('Package installed successfully!');
```

Run: `node test.js`

---

## Security Checklist

Before going to production:

- [ ] Token has only `repo` scope (minimal permissions)
- [ ] `.npmrc` is in `.gitignore`
- [ ] Token is stored securely (password manager/keychain)
- [ ] Environment variables are used (not hardcoded)
- [ ] Team members have their own tokens
- [ ] CI/CD uses secrets (not hardcoded tokens)
- [ ] Token rotation schedule is set
- [ ] Old/unused tokens are revoked

---

## Quick Reference

### Setup (One-time)

```bash
# 1. Set environment variable
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # PowerShell
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # Linux/Mac

# 2. Create .npmrc
echo "//github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}" > .npmrc

# 3. Add to .gitignore
echo ".npmrc" >> .gitignore

# 4. Install
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

### Daily Usage

```bash
# Just install/update normally
npm install
npm update scope-inspect-calendar
```

---

## Summary

**Recommended Setup:**
1. Create PAT with `repo` scope
2. Store token in environment variable
3. Create `.npmrc` using `${GITHUB_TOKEN}`
4. Add `.npmrc` to `.gitignore`
5. Install package normally

This keeps your token secure and out of version control while making installation seamless for your team.

