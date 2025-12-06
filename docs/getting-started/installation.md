# Installation

This guide will help you install ScopeInspect Calendar in your React project from a **private GitHub repository** using **Personal Access Token (PAT)**.

## Prerequisites

Before installing ScopeInspect Calendar, ensure you have:

- ✅ **GitHub account** with access to the private repository
- ✅ **React** 19.1.0 or higher
- ✅ **React DOM** 19.1.0 or higher
- ✅ **Tailwind CSS** 4.1.11 or higher
- ✅ **tailwindcss-animate** 1.0.7 or higher
- ✅ **npm** installed (version 6.0.0 or higher)
- ✅ **Node.js** installed
- ✅ **TypeScript** (recommended, but not required)
- ✅ Access to the private repository: `heye-muqeet/scope-inspect-calendar`

## Step 1: Create Personal Access Token

### 1.1 Navigate to GitHub Settings

1. Go to [GitHub.com](https://github.com) and sign in
2. Click your profile picture (top right)
3. Click **Settings**
4. Scroll down and click **Developer settings** (left sidebar)
5. Click **Personal access tokens** → **Tokens (classic)**

### 1.2 Generate New Token

1. Click **Generate new token** → **Generate new token (classic)**
2. **Note**: Give it a descriptive name, e.g., `ScopeInspect Calendar Package Access`
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

## Step 2: Set Environment Variable

Set the `GITHUB_TOKEN` environment variable with your Personal Access Token.

### Windows (PowerShell)

**For current session only:**

```powershell
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Permanently (User-level - Recommended):**

```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'User')
```

**After setting permanently, restart your terminal/PowerShell for it to take effect.**

### Windows (Command Prompt)

```cmd
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Note:** You'll need to open a new command prompt for the variable to be available.

### Linux/Mac

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

### Verify Environment Variable is Set

**Windows PowerShell:**

```powershell
echo $env:GITHUB_TOKEN
```

**Linux/Mac:**

```bash
echo $GITHUB_TOKEN
```

You should see your token (starting with `ghp_`).

## Step 3: Create .npmrc File

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

## Step 4: Install Package

Now install the package:

```bash
npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
```

npm will automatically:

1. Read `.npmrc` file
2. Find `${GITHUB_TOKEN}` reference
3. Replace it with the value from your environment variable
4. Use the token for authentication

## Step 5: Install Peer Dependencies

ScopeInspect Calendar requires the following peer dependencies. Install them:

```bash
# Using npm
npm install react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using yarn
yarn add react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using pnpm
pnpm add react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using bun
bun add react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

## Verify Installation

After installation, verify that the package is correctly installed:

```bash
# Check package version
npm list scope-inspect-calendar

# Or with yarn
yarn list --pattern scope-inspect-calendar
```

### Test Import

```typescript
// test.tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
console.log('Package installed successfully!')
```

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

### Issue: "Cannot find module 'scope-inspect-calendar'"

**Causes:**

- Package not installed
- Wrong branch specified
- Build files missing in main branch

**Solutions:**

1. Run `npm install` again
2. Verify you're using `#main` branch
3. Check that `dist/` folder exists in main branch

## Security Best Practices

### ✅ DO:

1. **Use environment variables** for tokens (allows committing `.npmrc` to git)
2. **Commit `.npmrc` to git** when using `${GITHUB_TOKEN}` (it's safe!)
3. **Set `GITHUB_TOKEN` permanently** in your system environment
4. **Rotate tokens regularly** (every 90 days recommended)
5. **Use minimal scopes** (only `repo` scope needed)
6. **Store tokens in password manager** for backup
7. **Verify `.npmrc` doesn't contain actual tokens** before committing

### ❌ DON'T:

1. **Put actual tokens in `.npmrc`** (use `${GITHUB_TOKEN}` instead)
2. **Commit `.npmrc` with hardcoded tokens** (check before committing!)
3. **Share tokens** in chat, email, or documents
4. **Hardcode tokens** in code or config files
5. **Store tokens in plain text files** (use environment variables)

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

## Next Steps

Once installation is complete, proceed to:

1. **[Project Setup](./project-setup.md)** - Configure Tailwind CSS and TypeScript
2. **[Quick Start](./quick-start.md)** - Create your first calendar
3. **[Basic Usage](./basic-usage.md)** - Learn the fundamentals

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Quick Start Guide](./quick-start.md)
- [Project Setup](./project-setup.md)
- [Basic Usage](./basic-usage.md)
