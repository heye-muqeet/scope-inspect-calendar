# Complete Guide: Publishing Your Package to npm Public Registry

This guide provides a comprehensive, step-by-step walkthrough for publishing your customized ilamy Calendar package to the public npm registry.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites Checklist](#prerequisites-checklist)
3. [Step 1: Create npm Account](#step-1-create-npm-account)
4. [Step 2: Install and Configure npm CLI](#step-2-install-and-configure-npm-cli)
5. [Step 3: Choose Your Package Name](#step-3-choose-your-package-name)
6. [Step 4: Configure Your Package](#step-4-configure-your-package)
7. [Step 5: Prepare Required Files](#step-5-prepare-required-files)
8. [Step 6: Build Your Package](#step-6-build-your-package)
9. [Step 7: Test Before Publishing](#step-7-test-before-publishing)
10. [Step 8: Login to npm](#step-8-login-to-npm)
11. [Step 9: Publish Your Package](#step-9-publish-your-package)
12. [Step 10: Verify Publication](#step-10-verify-publication)
13. [Step 11: Install and Test in a Project](#step-11-install-and-test-in-a-project)
14. [Updating Your Published Package](#updating-your-published-package)
15. [Troubleshooting](#troubleshooting)
16. [Best Practices](#best-practices)

---

## Overview

Publishing to npm public registry allows anyone to install and use your package. This guide walks you through the entire process from account creation to publishing and updating your package.

**What you'll accomplish:**
- ✅ Create an npm account
- ✅ Configure your package for publishing
- ✅ Build and test your package
- ✅ Publish to npm public registry
- ✅ Install your package in projects
- ✅ Update your published package

**Time Required:** 30-60 minutes (first time)

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js installed** (version 18 or higher recommended)
  - Check: `node --version`
  - Download: [nodejs.org](https://nodejs.org/)
- [ ] **npm CLI installed** (comes with Node.js)
  - Check: `npm --version`
  - Update: `npm install -g npm@latest`
- [ ] **Git repository** set up (for repository URL in package.json)
- [ ] **Build tools configured** (Bun, build scripts, etc.)
- [ ] **Package code ready** (your customized calendar code)

---

## Step 1: Create npm Account

### 1.1 Sign Up on npm

1. **Visit npm website:**
   - Go to [npmjs.com/signup](https://www.npmjs.com/signup)

2. **Fill in registration form:**
   - **Username**: Choose carefully - this becomes your scope for scoped packages
     - Examples: `johndoe`, `acme-corp`, `mycompany`
     - Must be lowercase, no spaces
     - Check availability before proceeding
   - **Email**: Use a valid email address (will be verified)
   - **Password**: Create a strong password

3. **Verify your email:**
   - Check your email inbox
   - Click the verification link
   - If you don't receive email, check spam folder or request resend

### 1.2 Verify Account Setup

After signing up, verify everything is set correctly:

```bash
# Check if npm is accessible
npm --version

# Check current registry (should be https://registry.npmjs.org/)
npm config get registry
```

**Expected output:**
```
https://registry.npmjs.org/
```

---

## Step 2: Install and Configure npm CLI

### 2.1 Verify npm Installation

```bash
# Check npm version
npm --version

# Should output something like: 10.x.x or higher
```

### 2.2 Update npm (if needed)

```bash
# Update npm to latest version
npm install -g npm@latest

# Verify update
npm --version
```

### 2.3 Configure npm Settings (Optional but Recommended)

Set your default author information:

```bash
# Set your name (for package author field)
npm config set init-author-name "Your Name"

# Set your email
npm config set init-author-email "your.email@example.com"

# Set your website/homepage
npm config set init-author-url "https://yourwebsite.com"

# Set default license
npm config set init-license "MIT"

# Verify settings
npm config list
```

---

## Step 3: Choose Your Package Name

### 3.1 Understanding Package Names

You have two options:

**Option A: Scoped Package (Recommended)**
- Format: `@username/package-name`
- Example: `@johndoe/ilamy-calendar-custom`
- **Pros**: Guaranteed availability, organized, clear ownership
- **Cons**: Slightly longer to type

**Option B: Unscoped Package**
- Format: `package-name`
- Example: `ilamy-calendar-custom`
- **Pros**: Shorter name
- **Cons**: Might be taken, harder to get unique name

### 3.2 Check Name Availability

**For scoped packages:**
- Scoped names are always available (based on your username)
- Format: `@your-username/package-name`

**For unscoped packages:**

```bash
# Search for existing package
npm search package-name

# Or visit in browser
# https://www.npmjs.com/package/package-name

# If 404 error, name is available
# If package page loads, name is taken
```

### 3.3 Naming Best Practices

- ✅ Use lowercase letters
- ✅ Use hyphens to separate words: `my-calendar-package`
- ✅ Keep it descriptive but concise
- ✅ Avoid using common words alone: `calendar` ❌, `custom-calendar` ✅
- ✅ Check trademark issues
- ❌ Don't use spaces or special characters (except hyphens)
- ❌ Don't start with numbers

**Examples:**
- ✅ `@johndoe/ilamy-calendar-custom`
- ✅ `@acme/calendar-component`
- ✅ `my-awesome-calendar`
- ❌ `My Calendar Package` (spaces)
- ❌ `ilamy_calendar` (underscores)

---

## Step 4: Configure Your Package

### 4.1 Update package.json

Open your `package.json` file and update the following fields:

```json
{
  "name": "@your-username/ilamy-calendar-custom",
  "version": "1.0.0",
  "description": "Your customized version of ilamy Calendar with additional features",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/your-username/ilamy-calendar#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/ilamy-calendar.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/ilamy-calendar/issues"
  },
  "keywords": [
    "react",
    "calendar",
    "typescript",
    "customized",
    "ilamy-calendar",
    "events",
    "scheduling"
  ],
  "private": false,
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  }
}
```

### 4.2 Required Fields Explained

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Package identifier (must be unique) | `@johndoe/ilamy-calendar` |
| `version` | Current version (semantic versioning) | `1.0.0` |
| `description` | Brief description (shown on npm) | "Customized calendar component" |
| `author` | Package author | `"John Doe <john@example.com>"` |
| `license` | License type | `"MIT"` |
| `private` | Must be `false` for public packages | `false` |
| `main` | Entry point for CommonJS | `"./dist/index.js"` |
| `types` | TypeScript definitions | `"./dist/index.d.ts"` |
| `files` | Files to include in package | `["dist", "README.md", "LICENSE"]` |
| `publishConfig.access` | Set to `"public"` for scoped packages | `"public"` |

### 4.3 Complete package.json Example

Here's a complete example based on your calendar project:

```json
{
  "name": "@your-username/ilamy-calendar-custom",
  "version": "1.0.0",
  "description": "A customized, full-featured React calendar component library with enhanced features, built with Shadcn-Ui, Tailwind CSS, and TypeScript.",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "url": "https://yourwebsite.com"
  },
  "license": "MIT",
  "homepage": "https://github.com/your-username/ilamy-calendar#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/ilamy-calendar.git",
    "directory": "."
  },
  "bugs": {
    "url": "https://github.com/your-username/ilamy-calendar/issues"
  },
  "keywords": [
    "react",
    "calendar",
    "typescript",
    "tailwind",
    "components",
    "shadcn",
    "radix-ui",
    "dnd-kit",
    "motion",
    "events",
    "scheduling",
    "drag-and-drop",
    "recurring-events",
    "customized"
  ],
  "private": false,
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "NODE_ENV=production bunx bunup",
    "test": "bun test",
    "type-check": "bunx tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwindcss": "^4.1.11",
    "tailwindcss-animate": "^1.0.7"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

**Important Notes:**
- Set `"private": false` - Required for publishing
- Set `"publishConfig.access": "public"` - Required for scoped packages
- `files` array controls what gets published (only listed files/folders)
- `peerDependencies` are not bundled (users install them separately)

---

## Step 5: Prepare Required Files

### 5.1 LICENSE File

Public packages require a license file. Create a `LICENSE` file in your project root.

**Option 1: MIT License (Most Common)**

Create `LICENSE` file:

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Replace `2024` with current year and `Your Name` with your name.

**Other License Options:**
- Apache 2.0
- GPL v3
- ISC
- Unlicense

Visit [choosealicense.com](https://choosealicense.com/) for help choosing.

### 5.2 README.md File

Ensure you have a comprehensive README.md. Minimum should include:

```markdown
# @your-username/ilamy-calendar-custom

Your customized calendar component description.

## Installation

```bash
npm install @your-username/ilamy-calendar-custom
# or
bun add @your-username/ilamy-calendar-custom
```

## Usage

\`\`\`typescript
import { IlamyCalendar } from '@your-username/ilamy-calendar-custom'

function App() {
  return <IlamyCalendar events={[]} />
}
\`\`\`

## Features

- List your custom features
- Enhanced functionality
- Custom modifications

## Documentation

[Link to full documentation]

## License

MIT
```

### 5.3 .npmignore File (Optional)

If you don't use the `files` field in package.json, create `.npmignore`:

```
# Source files (not needed in package)
src/
*.ts
!*.d.ts

# Development files
node_modules/
.git/
.vscode/
.idea/
*.log
.env
.env.local

# Build tools
tsconfig.json
bunup.config.ts
bunfig.toml

# Test files
*.test.ts
*.test.tsx
__tests__/
coverage/

# Documentation (except README)
docs/
*.md
!README.md

# CI/CD
.github/
.gitlab-ci.yml

# Examples
examples/
```

**Note:** If you use `files` in package.json, `.npmignore` is less important. The `files` field is more explicit and recommended.

### 5.4 Verify Files Exist

```bash
# Check required files
ls -la LICENSE README.md package.json

# Verify LICENSE content
head -5 LICENSE

# Verify README exists and has content
wc -l README.md
```

---

## Step 6: Build Your Package

### 6.1 Clean Previous Builds

```bash
# Remove old build artifacts
rm -rf dist
rm -rf node_modules/.cache

# On Windows PowerShell:
# Remove-Item -Recurse -Force dist
# Remove-Item -Recurse -Force node_modules\.cache
```

### 6.2 Run Tests (Recommended)

```bash
# Run all tests
bun test

# Or with coverage
bun test --coverage
```

### 6.3 Build the Package

```bash
# Build for production
bun run build

# Or directly with bunup
NODE_ENV=production bunx bunup
```

### 6.4 Verify Build Output

```bash
# Check dist folder exists
ls -la dist/

# Should see:
# - index.js (compiled JavaScript)
# - index.d.ts (TypeScript definitions)
# - index.js.map (source map, if enabled)

# Verify file sizes (should not be empty)
ls -lh dist/

# On Windows:
# dir dist
```

**Expected structure:**
```
dist/
├── index.js
├── index.d.ts
└── index.js.map (optional)
```

### 6.5 Verify Build Quality

```bash
# Check TypeScript definitions
cat dist/index.d.ts | head -20

# Verify exports are correct
node -e "console.log(Object.keys(require('./dist/index.js')))"
```

---

## Step 7: Test Before Publishing

### 7.1 Dry Run - See What Will Be Published

```bash
# Create a tarball to see what gets packaged
npm pack

# This creates a file like: your-username-ilamy-calendar-custom-1.0.0.tgz

# View contents
tar -tzf your-username-ilamy-calendar-custom-1.0.0.tgz | head -30

# On Windows, use 7-Zip or similar to extract and view
```

**Verify included files:**
- ✅ `package.json`
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `dist/` folder with all files
- ❌ No `src/` files (unless intended)
- ❌ No `node_modules/`
- ❌ No test files
- ❌ No `.git/` folder

### 7.2 Test Installation Locally

```bash
# Create test directory
mkdir test-install
cd test-install

# Initialize npm project
npm init -y

# Install from tarball
npm install ../your-username-ilamy-calendar-custom-1.0.0.tgz

# Verify installation
ls node_modules/@your-username/ilamy-calendar-custom/

# Test import (create test file)
cat > test.js << 'EOF'
const pkg = require('@your-username/ilamy-calendar-custom');
console.log('Package loaded:', !!pkg);
console.log('Exports:', Object.keys(pkg));
EOF

node test.js

# Clean up
cd ..
rm -rf test-install
rm *.tgz
```

### 7.3 Type Check (if TypeScript)

```bash
# Verify TypeScript definitions work
bun run type-check

# Or manually
bunx tsc --noEmit --skipLibCheck
```

---

## Step 8: Login to npm

### 8.1 Login Command

```bash
# Login to npm (will open browser for authentication)
npm login
```

**What happens:**
1. Prompts for username
2. Prompts for password
3. Prompts for email
4. Opens browser for two-factor authentication (if enabled)
5. Returns to terminal when successful

**Alternative - Non-interactive login:**
```bash
# Using command line flags (less secure)
npm login --auth-type=legacy
```

### 8.2 Verify Login

```bash
# Check who you're logged in as
npm whoami

# Should output your npm username
```

### 8.3 Check Registry

```bash
# Verify you're using correct registry
npm config get registry

# Should output:
# https://registry.npmjs.org/

# If not, set it:
npm config set registry https://registry.npmjs.org/
```

### 8.4 Troubleshooting Login

**Issue: "Incorrect password"**
- Reset password at [npmjs.com](https://www.npmjs.com/login)
- Use `npm login` again

**Issue: "Email not verified"**
- Check email and verify account
- Request new verification email if needed

**Issue: Two-factor authentication**
- Enter OTP from authenticator app
- Or use backup codes

---

## Step 9: Publish Your Package

### 9.1 Final Pre-Publish Checklist

Before publishing, verify:

- [ ] Package name is correct in package.json
- [ ] Version number is set (e.g., `1.0.0`)
- [ ] `"private": false` in package.json
- [ ] `"publishConfig.access": "public"` (for scoped packages)
- [ ] LICENSE file exists
- [ ] README.md exists and is informative
- [ ] Build completed successfully
- [ ] Tests pass
- [ ] No sensitive data in package
- [ ] Logged in to npm (`npm whoami` works)

### 9.2 Publish Command

**For scoped packages (recommended):**

```bash
# Publish with explicit public access
npm publish --access public

# Or if publishConfig.access is already set to "public":
npm publish
```

**For unscoped packages:**

```bash
# Simply publish (unscoped packages are public by default)
npm publish
```

### 9.3 Publish Output

You should see output like:

```
npm notice
npm notice 📦  @your-username/ilamy-calendar-custom@1.0.0
npm notice === Tarball Contents ===
npm notice 1.2kB dist/index.js
npm notice 0.8kB dist/index.d.ts
npm notice 3.1kB README.md
npm notice 1.1kB LICENSE
npm notice 0.5kB package.json
npm notice === Tarball Details ===
npm notice name:          @your-username/ilamy-calendar-custom
npm notice version:       1.0.0
npm notice filename:      your-username-ilamy-calendar-custom-1.0.0.tgz
npm notice package size:  6.8 kB
npm notice unpacked size: 7.2 kB
npm notice shasum:        abc123def456...
npm notice integrity:     sha512-abc123...
npm notice total files:   5
npm notice
+ @your-username/ilamy-calendar-custom@1.0.0
```

### 9.4 Common Errors and Solutions

**Error: "You do not have permission to publish"**
- Solution: Verify you're logged in with correct account
- Check: `npm whoami`
- Fix: `npm login` again

**Error: "Package name already exists"**
- Solution: Choose different package name
- Or: Update version if it's your package

**Error: "Invalid package name"**
- Solution: Check naming rules (lowercase, no spaces, etc.)
- Fix: Update name in package.json

**Error: "Missing LICENSE file"**
- Solution: Create LICENSE file in project root
- Or: Set `"license": "UNLICENSED"` (not recommended)

---

## Step 10: Verify Publication

### 10.1 Check on npm Website

1. **Visit your package page:**
   ```
   https://www.npmjs.com/package/@your-username/ilamy-calendar-custom
   ```
   (Replace `@your-username/ilamy-calendar-custom` with your package name)

2. **Verify package information:**
   - ✅ Package name is correct
   - ✅ Version is correct
   - ✅ Description is shown
   - ✅ README.md is displayed
   - ✅ License is shown
   - ✅ Repository link works
   - ✅ Keywords are listed

### 10.2 Check via npm CLI

```bash
# View package info
npm view @your-username/ilamy-calendar-custom

# View specific version
npm view @your-username/ilamy-calendar-custom@1.0.0

# View all versions
npm view @your-username/ilamy-calendar-custom versions

# View package metadata
npm info @your-username/ilamy-calendar-custom
```

### 10.3 Search on npm

```bash
# Search for your package
npm search ilamy-calendar-custom

# Or visit search page
# https://www.npmjs.com/search?q=ilamy-calendar-custom
```

**Note:** It may take a few minutes for your package to appear in search results.

---

## Step 11: Install and Test in a Project

### 11.1 Create Test Project

```bash
# Create new directory
mkdir test-calendar-install
cd test-calendar-install

# Initialize npm project
npm init -y

# Or with Bun
bun init -y
```

### 11.2 Install Your Package

```bash
# Install from npm
npm install @your-username/ilamy-calendar-custom

# Or with Bun
bun add @your-username/ilamy-calendar-custom

# Or with yarn
yarn add @your-username/ilamy-calendar-custom

# Or with pnpm
pnpm add @your-username/ilamy-calendar-custom
```

### 11.3 Verify Installation

```bash
# Check package.json
cat package.json | grep ilamy-calendar-custom

# Check node_modules
ls node_modules/@your-username/ilamy-calendar-custom/

# Verify files exist
ls node_modules/@your-username/ilamy-calendar-custom/dist/
```

### 11.4 Test Import

Create a test file to verify imports work:

**test-import.js:**
```javascript
// Test CommonJS import
const calendar = require('@your-username/ilamy-calendar-custom');
console.log('Package imported successfully!');
console.log('Available exports:', Object.keys(calendar));
```

**test-import.mjs:**
```javascript
// Test ES Module import
import { IlamyCalendar } from '@your-username/ilamy-calendar-custom';
console.log('Package imported successfully!');
console.log('IlamyCalendar:', typeof IlamyCalendar);
```

Run test:
```bash
# Test CommonJS
node test-import.js

# Test ES Modules
node test-import.mjs
```

### 11.5 Test in Next.js Project

```bash
# Create Next.js project (if testing React component)
bunx create-next-app@latest test-calendar

cd test-calendar

# Install your package
bun add @your-username/ilamy-calendar-custom

# Create test page
```

**app/test/page.tsx:**
```typescript
'use client'

import { IlamyCalendar } from '@your-username/ilamy-calendar-custom'

export default function TestPage() {
  return (
    <div>
      <h1>Calendar Test</h1>
      <IlamyCalendar events={[]} />
    </div>
  )
}
```

Run and test:
```bash
bun run dev
```

Visit `http://localhost:3000/test` to see your calendar component.

### 11.6 Clean Up Test Project

```bash
# Remove test project
cd ..
rm -rf test-calendar-install
```

---

## Updating Your Published Package

### Version Numbering (Semantic Versioning)

Follow [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes

### Update Process

#### Step 1: Make Your Changes

```bash
# Make code changes
# Update features, fix bugs, etc.
```

#### Step 2: Update Version

**Option A: Using npm version (Recommended)**

```bash
# Patch version (bug fix)
npm version patch
# Updates: 1.0.0 → 1.0.1

# Minor version (new feature)
npm version minor
# Updates: 1.0.0 → 1.1.0

# Major version (breaking change)
npm version major
# Updates: 1.0.0 → 2.0.0
```

This command:
- ✅ Updates version in package.json
- ✅ Creates git commit (if in git repo)
- ✅ Creates git tag

**Option B: Manual Update**

Edit `package.json`:
```json
{
  "version": "1.0.1"
}
```

#### Step 3: Build and Test

```bash
# Run tests
bun test

# Build package
bun run build

# Verify build
ls -la dist/
```

#### Step 4: Publish Update

```bash
# Publish new version
npm publish

# Or with explicit access
npm publish --access public
```

#### Step 5: Verify Update

```bash
# Check new version is published
npm view @your-username/ilamy-calendar-custom version

# View all versions
npm view @your-username/ilamy-calendar-custom versions
```

### Pre-release Versions

For testing before official release:

```bash
# Alpha version
npm version 1.1.0-alpha.1
npm publish --tag alpha

# Beta version
npm version 1.1.0-beta.1
npm publish --tag beta

# Install pre-release
npm install @your-username/ilamy-calendar-custom@alpha
```

---

## Troubleshooting

### Issue 1: "403 Forbidden" Error

**Symptoms:**
```
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/...
```

**Solutions:**
- Check you're logged in: `npm whoami`
- Verify package name is available
- For scoped packages, ensure `--access public` flag
- Check if package name conflicts with existing package

### Issue 2: "Package name already exists"

**Symptoms:**
```
npm ERR! code E403
npm ERR! You cannot publish over the previously published versions
```

**Solutions:**
- Update version number: `npm version patch`
- Or use different package name

### Issue 3: "Missing LICENSE file"

**Symptoms:**
```
npm WARN missing LICENSE file
```

**Solutions:**
- Create LICENSE file in project root
- Or set `"license": "UNLICENSED"` in package.json (not recommended for public packages)

### Issue 4: Build Fails

**Symptoms:**
```
Error: Build failed
```

**Solutions:**
- Check build configuration
- Verify all dependencies are installed
- Check for TypeScript errors: `bun run type-check`
- Review build logs for specific errors

### Issue 5: Package Not Appearing on npm

**Symptoms:**
- Package published but not visible on npmjs.com

**Solutions:**
- Wait 2-5 minutes for npm to index
- Clear browser cache
- Check correct package name spelling
- Verify publication succeeded (check terminal output)

### Issue 6: Cannot Install Published Package

**Symptoms:**
```
npm ERR! code E404
npm ERR! 404 Not Found
```

**Solutions:**
- Verify package name is correct
- Check package is actually published: `npm view package-name`
- Wait a few minutes after publishing
- Clear npm cache: `npm cache clean --force`

### Issue 7: Wrong Files Published

**Symptoms:**
- Source files included when they shouldn't be
- Missing dist files

**Solutions:**
- Check `files` array in package.json
- Verify `.npmignore` is correct
- Use `npm pack` to preview before publishing
- Ensure build completed successfully

---

## Best Practices

### 1. Version Management

- ✅ Start with `1.0.0` for stable releases
- ✅ Use `0.x.x` for development/beta versions
- ✅ Follow semantic versioning strictly
- ✅ Document breaking changes in CHANGELOG.md

### 2. Package Size

- ✅ Keep package small - only include necessary files
- ✅ Use `files` field to explicitly control included files
- ✅ Exclude source maps if not needed
- ✅ Use peerDependencies for common libraries

### 3. Documentation

- ✅ Write comprehensive README.md
- ✅ Include usage examples
- ✅ Document all exported APIs
- ✅ Add CHANGELOG.md for version history
- ✅ Link to full documentation if available

### 4. Testing

- ✅ Run tests before every publish
- ✅ Test installation in clean project
- ✅ Verify imports work correctly
- ✅ Test in different environments (Node.js versions)

### 5. Security

- ✅ Never commit secrets or API keys
- ✅ Review dependencies for vulnerabilities: `npm audit`
- ✅ Keep dependencies updated
- ✅ Use `.npmignore` to exclude sensitive files

### 6. CI/CD

Automate publishing with GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun run build
      - uses: actions/setup-node@v3
        with:
          registry-url: 'https://registry.npmjs.org'
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

### 7. Communication

- ✅ Respond to issues promptly
- ✅ Update package regularly
- ✅ Announce major changes
- ✅ Maintain changelog

---

## Quick Reference Commands

```bash
# Account Management
npm login                    # Login to npm
npm whoami                   # Check logged in user
npm logout                   # Logout

# Package Information
npm view package-name        # View package info
npm search package-name      # Search packages
npm info package-name        # Detailed package info

# Publishing
npm publish                  # Publish package
npm publish --access public  # Publish scoped package as public
npm pack                     # Create tarball (dry run)
npm version patch            # Bump patch version
npm version minor            # Bump minor version
npm version major            # Bump major version

# Testing
npm pack                     # Preview what will be published
npm install ./package.tgz    # Test install from tarball
npm view package-name version # Check published version
```

---

## Summary Checklist

Use this checklist before publishing:

- [ ] npm account created and verified
- [ ] Logged in to npm (`npm whoami` works)
- [ ] Package name chosen and available
- [ ] package.json configured correctly
- [ ] LICENSE file created
- [ ] README.md updated and comprehensive
- [ ] Build successful (`bun run build`)
- [ ] Tests pass (`bun test`)
- [ ] Type check passes (`bun run type-check`)
- [ ] Dry run checked (`npm pack`)
- [ ] Local installation tested
- [ ] Version number set correctly
- [ ] No sensitive data in package
- [ ] Ready to publish!

---

## Additional Resources

- **npm Documentation**: https://docs.npmjs.com/
- **Semantic Versioning**: https://semver.org/
- **npm Package Best Practices**: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- **Choose a License**: https://choosealicense.com/
- **npm Package.json Reference**: https://docs.npmjs.com/cli/v9/configuring-npm/package-json

---

**Congratulations!** 🎉 You've successfully published your package to npm. Users can now install it with:

```bash
npm install @your-username/ilamy-calendar-custom
```

---

**Last Updated**: Based on current npm publishing practices and package configuration

