# Package Publishing Guide: Publishing Your Customized Calendar

This guide provides comprehensive instructions for publishing your customized version of the ilamy Calendar package to npm, covering both public and private publishing options.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Public Package Publishing](#public-package-publishing)
4. [Private Package Publishing](#private-package-publishing)
5. [Public vs Private: Key Differences](#public-vs-private-key-differences)
6. [Pre-Publishing Checklist](#pre-publishing-checklist)
7. [Version Management](#version-management)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Overview

After cloning and customizing the ilamy Calendar repository, you can publish your version as an npm package. This allows you to:

- Share your customized calendar across multiple projects
- Maintain version control of your changes
- Distribute to your team or organization
- Use standard npm workflows for dependency management

You have two main options:

1. **Public Package**: Anyone can install and use it (requires npm account)
2. **Private Package**: Only authorized users/organizations can access (requires paid npm account or alternative registry)

---

## Prerequisites

### 1. npm Account Setup

#### For Public Packages

1. **Create npm account**:
   - Visit [npmjs.com/signup](https://www.npmjs.com/signup)
   - Choose a username (this becomes your scope for scoped packages)
   - Verify your email address

2. **Verify your account** (optional but recommended):
   ```bash
   npm whoami
   ```

#### For Private Packages

**Option A: npm Private Packages (Paid)**
- Requires npm Pro ($7/month) or npm Teams ($7/user/month)
- Visit [npmjs.com/pricing](https://www.npmjs.com/pricing)

**Option B: Alternative Private Registries (Free/Paid)**
- **GitHub Packages**: Free for public repos, paid for private
- **Verdaccio**: Self-hosted (free)
- **AWS CodeArtifact**: Pay-per-use
- **Azure Artifacts**: Part of Azure DevOps

### 2. npm CLI Installation

Ensure npm is installed and up-to-date:

```bash
# Check npm version
npm --version

# Update npm to latest
npm install -g npm@latest
```

### 3. Login to npm

```bash
# Login to npm (opens browser for authentication)
npm login

# Verify login
npm whoami
```

**For Private Registries:**

```bash
# GitHub Packages example
npm login --registry=https://npm.pkg.github.com --scope=@your-org

# Custom registry
npm login --registry=https://your-registry.com
```

### 4. Project Configuration

Before publishing, ensure your project is properly configured:

#### Required Files

1. **`package.json`** - Must be properly configured (see configuration section)
2. **`LICENSE`** - Required for public packages
3. **`README.md`** - Recommended for package documentation
4. **`.npmignore`** or `files` field in `package.json` - Controls what gets published

#### Package.json Configuration

Update your `package.json` with the following:

```json
{
  "name": "@your-username/ilamy-calendar",
  "version": "1.0.0",
  "description": "Your customized calendar component",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/your-username/ilamy-calendar",
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
    "customized"
  ],
  "private": false,
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

**Important fields explained:**

- **`name`**: Package name. Use scoped format (`@username/package-name`) to avoid name conflicts
- **`version`**: Follow semantic versioning (see Version Management section)
- **`private`**: Set to `false` for publishing
- **`files`**: Array of files/folders to include in the package
- **`publishConfig.access`**: Set to `"public"` or `"restricted"` (for private scoped packages)

### 5. Build Configuration

Ensure your build process is set up:

```bash
# Test the build
bun run build

# Verify dist folder was created
ls dist/
```

The build should create:
- `dist/index.js` - Compiled JavaScript
- `dist/index.d.ts` - TypeScript definitions
- Source maps (if configured)

### 6. License File

Public packages require a license. Common options:

- **MIT License** (most permissive, recommended for open source)
- **Apache 2.0** (more legal protection)
- **GPL** (copyleft license)
- **Unlicense** (public domain)

Create a `LICENSE` file in your project root.

---

## Public Package Publishing

### Step 1: Prepare Package Configuration

1. **Update package.json**:

```json
{
  "name": "@your-username/ilamy-calendar",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

**Important notes:**
- Use a **scoped package name** (`@username/package-name`) to avoid conflicts
- Scoped packages are private by default; set `access: "public"` to make them public
- Or use an unscoped name (check availability first)

2. **Check package name availability**:

```bash
npm search your-package-name
# or visit: https://www.npmjs.com/package/your-package-name
```

### Step 2: Clean and Build

```bash
# Clean previous builds
rm -rf dist node_modules/.cache

# Run tests (optional but recommended)
bun test

# Build the package
bun run build

# Verify build output
ls -la dist/
```

### Step 3: Check What Will Be Published

```bash
# Dry run - see what would be published (no actual publish)
npm pack --dry-run

# Or create a tarball to inspect
npm pack
tar -tzf *.tgz | head -20
rm *.tgz  # Clean up
```

### Step 4: Verify Package.json

Double-check these fields:

```json
{
  "name": "@your-username/ilamy-calendar",
  "version": "1.0.0",
  "description": "Clear description of your package",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "keywords": ["react", "calendar", "typescript"],
  "license": "MIT",
  "private": false
}
```

### Step 5: Login to npm

```bash
# Login (opens browser)
npm login

# Verify
npm whoami
```

### Step 6: Publish

```bash
# Publish public scoped package
npm publish --access public

# Or if publishConfig.access is set to "public":
npm publish
```

**For unscoped packages:**
```bash
npm publish
```

### Step 7: Verify Publication

1. **Check npm registry**:
   - Visit: `https://www.npmjs.com/package/@your-username/ilamy-calendar`
   - Verify package details are correct

2. **Test installation**:
   ```bash
   # In a test directory
   mkdir test-install
   cd test-install
   npm init -y
   npm install @your-username/ilamy-calendar
   
   # Verify it works
   node -e "console.log(require('@your-username/ilamy-calendar'))"
   ```

### Step 8: Install in Your Projects

```bash
# In your Next.js project
bun add @your-username/ilamy-calendar
# or
npm install @your-username/ilamy-calendar
```

---

## Private Package Publishing

Private packages can be published through various methods. Here are the most common:

### Method 1: npm Private Packages (Paid)

Requires npm Pro ($7/month) or npm Teams subscription.

#### Setup

1. **Subscribe to npm Pro**:
   - Visit [npmjs.com/pricing](https://www.npmjs.com/pricing)
   - Choose npm Pro or Teams plan
   - Complete payment

2. **Configure package.json**:

```json
{
  "name": "@your-org/ilamy-calendar",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "restricted",
    "registry": "https://registry.npmjs.org/"
  }
}
```

3. **Publish**:

```bash
npm publish
```

Private scoped packages default to restricted access. Only members of your organization can install them.

#### Organization Setup

1. **Create organization**:
   - Visit [npmjs.com/org/create](https://www.npmjs.com/org/create)
   - Choose organization name
   - Add team members

2. **Package naming**:
   ```json
   {
     "name": "@your-org/ilamy-calendar"
   }
   ```

### Method 2: GitHub Packages (Free for Public Repos)

GitHub Packages provides free package hosting for public repositories.

#### Setup

1. **Create Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate token with `write:packages` and `read:packages` scopes
   - Save token securely

2. **Configure package.json**:

```json
{
  "name": "@your-github-username/ilamy-calendar",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/ilamy-calendar.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

3. **Configure .npmrc**:

Create `.npmrc` file in project root:

```
@your-github-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Or login:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@your-github-username
```

**Username**: Your GitHub username  
**Password**: Your Personal Access Token  
**Email**: Your GitHub email

4. **Publish**:

```bash
npm publish
```

5. **Install in projects**:

Create `.npmrc` in consuming project:

```
@your-github-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
npm install @your-github-username/ilamy-calendar
```

### Method 3: Self-Hosted Registry (Verdaccio)

Run your own private npm registry using Verdaccio - a lightweight, zero-configuration, open-source npm registry.

#### What is Verdaccio?

Verdaccio is a lightweight Node.js private npm proxy registry that:

- **Acts as a proxy** to the public npm registry, caching packages locally
- **Hosts private packages** that are only accessible within your network/organization
- **Provides authentication** and access control for packages
- **Runs locally** or can be deployed to servers (cloud or on-premises)
- **Is completely free** and open-source (MIT License)

**Key Features:**
- ✅ Private package hosting
- ✅ Public package proxying and caching
- ✅ User authentication and authorization
- ✅ Web UI for package browsing
- ✅ Supports multiple storage backends (local, S3, Google Cloud, etc.)
- ✅ Plugin system for extensibility
- ✅ SSL/TLS support

#### When to Use Verdaccio?

**Best for:**
- Organizations with multiple developers
- Companies needing complete control over their packages
- Teams requiring offline package access
- Organizations wanting to reduce external dependencies
- Cost-sensitive setups (free alternative to npm private packages)

**Use cases:**
- Internal company libraries and components
- Proprietary code that cannot be public
- Development teams sharing custom packages
- CI/CD pipelines with cached dependencies

---

#### Setup: Local Development

##### Step 1: Installation

**Prerequisites:**
- Node.js 18+ installed
- npm or yarn package manager

**Install Verdaccio globally:**

```bash
# Using npm
npm install -g verdaccio

# Using yarn
yarn global add verdaccio

# Using Bun (if supported)
bun add -g verdaccio

# Verify installation
verdaccio --version
```

##### Step 2: Start Verdaccio Server

```bash
verdaccio
```

**Default Configuration:**
- **URL**: `http://localhost:4873`
- **Storage**: `~/.local/share/verdaccio/storage` (Linux/Mac) or `%APPDATA%\verdaccio` (Windows)
- **Config**: `~/.config/verdaccio/config.yaml`

You should see output like:
```
 warn --- config file  - /home/user/.config/verdaccio/config.yaml
 warn --- Plugin successfully loaded: htpasswd
 warn --- Plugin successfully loaded: audit
 warn --- http address - http://localhost:4873/ - verdaccio/5.x.x
```

**Access Web UI:**
Open `http://localhost:4873` in your browser to view the Verdaccio web interface.

##### Step 3: Create User Account

```bash
# Add user to Verdaccio registry
npm adduser --registry http://localhost:4873

# You'll be prompted for:
# Username: your-username
# Password: your-password
# Email: your-email@example.com
```

**Alternative - Create user via web UI:**
1. Go to `http://localhost:4873`
2. Click "Sign Up"
3. Enter username, password, and email

##### Step 4: Configure Your Project

**Option A: Set Verdaccio as default registry** (affects all npm commands):

```bash
npm config set registry http://localhost:4873
```

**Option B: Use .npmrc file** (project-specific):

Create `.npmrc` in your calendar project root:

```
registry=http://localhost:4873
```

**Option C: Use scope-based registry** (recommended - only specific packages):

Create `.npmrc`:

```
@your-org:registry=http://localhost:4873
```

This way, only packages with `@your-org/` scope use Verdaccio, while others use public npm.

##### Step 5: Login to Verdaccio

```bash
npm login --registry http://localhost:4873

# Enter credentials you created in Step 3
```

##### Step 6: Configure package.json

Update your package.json:

```json
{
  "name": "@your-org/ilamy-calendar",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

##### Step 7: Build and Publish

```bash
# Build your package
bun run build

# Publish to Verdaccio
npm publish --registry http://localhost:4873

# Or if registry is set in .npmrc or npm config:
npm publish
```

**Verify publication:**
- Visit `http://localhost:4873` in browser
- Search for your package name
- You should see your package listed

##### Step 8: Install in Other Projects

**In your Next.js project, create `.npmrc`:**

```
@your-org:registry=http://localhost:4873
```

Then install:

```bash
npm install @your-org/ilamy-calendar
```

---

#### Setup: Production Deployment

For production use, you need to deploy Verdaccio on a server accessible to your team.

##### Option 1: Docker Deployment (Recommended)

**Create `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  verdaccio:
    image: verdaccio/verdaccio:latest
    container_name: verdaccio
    ports:
      - "4873:4873"
    volumes:
      - verdaccio-storage:/verdaccio/storage
      - verdaccio-config:/verdaccio/conf
      - verdaccio-plugins:/verdaccio/plugins
    environment:
      - VERDACCIO_PROTOCOL=https
    restart: unless-stopped

volumes:
  verdaccio-storage:
  verdaccio-config:
  verdaccio-plugins:
```

**Deploy:**

```bash
# Start Verdaccio
docker-compose up -d

# View logs
docker-compose logs -f verdaccio
```

**Update `.npmrc` in projects:**

```
@your-org:registry=https://your-domain.com:4873
```

##### Option 2: Server Deployment

1. **Install on server:**

```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Verdaccio
sudo npm install -g verdaccio

# Install PM2 (process manager)
sudo npm install -g pm2
```

2. **Configure Verdaccio:**

Edit config file (usually `/root/.config/verdaccio/config.yaml`):

```yaml
# Listen on all interfaces (0.0.0.0) instead of localhost
listen: 0.0.0.0:4873

# Configure storage path
storage: /var/verdaccio/storage

# Web UI title
web:
  title: Your Company Private Registry

# Authentication (htpasswd is default)
auth:
  htpasswd:
    file: /var/verdaccio/htpasswd
    max_users: 1000

# Uplinks (proxy to public npm)
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

# Packages configuration
packages:
  '@your-org/*':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

# Logs
logs:
  - { type: stdout, format: pretty, level: http }
```

3. **Start with PM2:**

```bash
# Start Verdaccio as a service
pm2 start verdaccio --name verdaccio

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

4. **Configure Reverse Proxy (Nginx):**

Create `/etc/nginx/sites-available/verdaccio`:

```nginx
server {
    listen 80;
    server_name registry.your-domain.com;

    location / {
        proxy_pass http://localhost:4873;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/verdaccio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Setup SSL with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d registry.your-domain.com
```

---

#### Advanced Configuration

##### Configuration File Location

Verdaccio config file is usually at:
- **Linux/Mac**: `~/.config/verdaccio/config.yaml`
- **Windows**: `%APPDATA%\verdaccio\config.yaml`

##### Key Configuration Options

**Full example `config.yaml`:**

```yaml
# Server configuration
listen: 0.0.0.0:4873
max_body_size: 10mb

# Web UI
web:
  title: My Company Private Registry
  enable: true
  gravatar: true
  sort_packages: asc
  darkMode: false

# Authentication
auth:
  htpasswd:
    file: /var/verdaccio/htpasswd
    max_users: 1000
    algorithm: bcrypt

# Package storage
storage: /var/verdaccio/storage
plugins: /var/verdaccio/plugins

# Logs
logs:
  - { type: stdout, format: pretty, level: http }
  - { type: file, path: /var/verdaccio/logs/verdaccio.log, level: info }

# Proxy to public npm
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    max_fails: 3
    timeout: 10s
    cache: true

# Package access control
packages:
  # Private packages (your org)
  '@your-org/*':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  # Public packages (proxied)
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

# Security
security:
  api:
    legacy: true
  web:
    sign: true
    verify: true

# Notifications (optional)
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://your-webhook-url.com
  content: '{"color":"green","message":"New package published: {{name}}@{{version}}"}'
```

##### Package Access Control

Configure who can access/publish packages:

```yaml
packages:
  # Only authenticated users can access/publish
  '@private/*':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated

  # Specific users only
  '@team/*':
    access: user1 user2 user3
    publish: user1 user2
    unpublish: user1

  # Everyone can read, only auth can publish
  '@public-private/*':
    access: $all
    publish: $authenticated

  # Public packages (proxied from npm)
  '**':
    access: $all
    proxy: npmjs
```

##### External Storage (AWS S3, Google Cloud)

**AWS S3 Storage Plugin:**

1. Install plugin:

```bash
npm install -g verdaccio-s3-storage
```

2. Update config.yaml:

```yaml
store:
  s3-storage:
    bucket: your-verdaccio-bucket
    keyPrefix: verdaccio/
    region: us-east-1
    accessKeyId: ${AWS_ACCESS_KEY_ID}
    secretAccessKey: ${AWS_SECRET_ACCESS_KEY}
```

---

#### Team Access Setup

##### Adding Team Members

1. **Via command line:**

```bash
# User creates account themselves
npm adduser --registry http://your-verdaccio-url:4873
```

2. **Via web UI:**
- Go to Verdaccio web interface
- Click "Sign Up"
- User creates account

3. **Manual user creation (htpasswd):**

```bash
# Install htpasswd
sudo apt-get install apache2-utils  # Linux
brew install httpd  # Mac

# Create/update password file
htpasswd -c /var/verdaccio/htpasswd username1
htpasswd /var/verdaccio/htpasswd username2
```

##### Organization Setup

Create organization-scoped packages:

1. **Set up scope in package.json:**

```json
{
  "name": "@your-company/ilamy-calendar",
  "publishConfig": {
    "registry": "http://your-verdaccio-url:4873"
  }
}
```

2. **Configure access in Verdaccio:**

```yaml
packages:
  '@your-company/*':
    access: $authenticated
    publish: $authenticated
```

3. **Team members configure .npmrc:**

```
@your-company:registry=http://your-verdaccio-url:4873
```

---

#### Security Best Practices

1. **Use HTTPS in Production:**
   - Setup SSL certificate (Let's Encrypt is free)
   - Configure reverse proxy (Nginx/Apache)

2. **Enable Authentication:**
   - Require login for all private packages
   - Use strong password policies

3. **Network Security:**
   - Use firewall rules
   - Restrict access to internal network/VPN
   - Use IP whitelisting if needed

4. **Regular Updates:**
   ```bash
   npm update -g verdaccio
   ```

5. **Backup Storage:**
   - Regularly backup `/var/verdaccio/storage`
   - Consider using external storage (S3, etc.)

---

#### Pros and Cons

**Pros:**
- ✅ **Completely Free** - No monthly fees
- ✅ **Full Control** - Complete control over packages and access
- ✅ **Offline Access** - Cached packages work offline
- ✅ **Faster Installs** - Local caching speeds up installs
- ✅ **Privacy** - Packages stay within your network
- ✅ **Customizable** - Extensive configuration options
- ✅ **Open Source** - Community support and contributions

**Cons:**
- ⚠️ **Infrastructure Required** - Need to maintain server
- ⚠️ **Setup Complexity** - Initial setup requires technical knowledge
- ⚠️ **Maintenance** - Need to keep server and Verdaccio updated
- ⚠️ **No Built-in UI for Management** - Basic web UI only
- ⚠️ **Scaling** - May need additional configuration for large teams
- ⚠️ **Backup Responsibility** - You're responsible for backups

---

#### Troubleshooting

**Issue: Cannot connect to Verdaccio**

```bash
# Check if Verdaccio is running
ps aux | grep verdaccio

# Check port
netstat -tulpn | grep 4873

# Restart Verdaccio
verdaccio
```

**Issue: Authentication fails**

```bash
# Clear npm credentials
npm logout --registry http://localhost:4873

# Re-login
npm login --registry http://localhost:4873
```

**Issue: Package not found after publish**

- Check storage directory permissions
- Verify package name matches scope configuration
- Check Verdaccio logs for errors

**Issue: Slow performance**

- Increase max_body_size in config
- Consider using external storage (S3)
- Check network latency
- Optimize uplink proxy settings

---

#### Additional Resources

- **Official Documentation**: https://verdaccio.org/docs
- **GitHub Repository**: https://github.com/verdaccio/verdaccio
- **Docker Hub**: https://hub.docker.com/r/verdaccio/verdaccio
- **Community Forum**: https://github.com/verdaccio/verdaccio/discussions

### Method 4: AWS CodeArtifact

Amazon's managed artifact repository service.

#### Setup

1. **Create repository**:

```bash
aws codeartifact create-repository \
  --domain your-domain \
  --domain-owner your-aws-account-id \
  --repository ilamy-calendar-repo
```

2. **Get authorization token**:

```bash
aws codeartifact get-authorization-token \
  --domain your-domain \
  --domain-owner your-aws-account-id \
  --query authorizationToken \
  --output text
```

3. **Configure npm**:

```bash
npm config set registry https://your-domain-123456789.d.codeartifact.us-east-1.amazonaws.com/npm/ilamy-calendar-repo/
```

4. **Login and publish**:

```bash
npm login --registry=https://your-domain-123456789.d.codeartifact.us-east-1.amazonaws.com/npm/ilamy-calendar-repo/
npm publish
```

---

## Public vs Private: Key Differences

### Public Packages

| Aspect | Details |
|--------|---------|
| **Cost** | Free |
| **Visibility** | Visible to everyone on npmjs.com |
| **Installation** | Anyone can `npm install` it |
| **Access Control** | No access restrictions |
| **Use Cases** | Open source projects, public libraries |
| **Package Name** | Can be scoped or unscoped |
| **Registry** | npm public registry only |

**Pros:**
- ✅ Free
- ✅ Easy distribution
- ✅ Discoverable by the community
- ✅ Can receive contributions

**Cons:**
- ❌ No access control
- ❌ Code is publicly visible
- ❌ Anyone can see your package structure

### Private Packages

| Aspect | Details |
|--------|---------|
| **Cost** | Varies by method (npm Pro: $7/month, GitHub: free for public repos, etc.) |
| **Visibility** | Only visible to authorized users |
| **Installation** | Requires authentication/authorization |
| **Access Control** | User/organization-level permissions |
| **Use Cases** | Internal tools, proprietary code, organization-specific packages |
| **Package Name** | Must be scoped (`@org/package-name`) for npm |
| **Registry** | Can use various registries (npm, GitHub, self-hosted, etc.) |

**Pros:**
- ✅ Access control
- ✅ Code remains private
- ✅ Better for proprietary/internal tools
- ✅ Can use organization-level management

**Cons:**
- ❌ May cost money (npm private packages)
- ❌ Requires authentication setup
- ❌ More complex distribution

### Comparison Table

| Feature | Public | Private (npm) | Private (GitHub) | Private (Self-hosted) |
|---------|--------|---------------|------------------|----------------------|
| **Cost** | Free | $7/month | Free (public repo) | Free (infrastructure cost) |
| **Setup Complexity** | Low | Medium | Medium | High |
| **Access Control** | None | Organization-based | Repository-based | Configurable |
| **Registry** | npmjs.com | npmjs.com | npm.pkg.github.com | Custom domain |
| **Best For** | Open source | Organizations | GitHub projects | Internal infrastructure |

---

## Pre-Publishing Checklist

Before publishing, verify:

- [ ] **Package name is available** and follows naming conventions
- [ ] **Version number** follows semantic versioning (e.g., `1.0.0`)
- [ ] **Build succeeds** without errors (`bun run build`)
- [ ] **Tests pass** (`bun test`)
- [ ] **LICENSE file** exists and is correct
- [ ] **README.md** is comprehensive and accurate
- [ ] **package.json** has correct metadata:
  - [ ] Name
  - [ ] Version
  - [ ] Description
  - [ ] Author
  - [ ] License
  - [ ] Repository URL
  - [ ] Keywords
  - [ ] Main/module/types fields point to dist/
- [ ] **files** array includes only necessary files
- [ ] **No sensitive data** (API keys, secrets, etc.)
- [ ] **.npmignore** excludes development files (if not using `files` field)
- [ ] **Dependencies** are correct (peerDependencies, dependencies)
- [ ] **TypeScript definitions** are generated (`dist/index.d.ts`)
- [ ] **Login** to npm/registry is verified (`npm whoami`)

### Quick Verification Script

```bash
#!/bin/bash
echo "Checking package.json..."
cat package.json | grep -E '"name"|"version"|"description"|"license"'

echo "\nChecking build..."
bun run build

echo "\nChecking dist folder..."
ls -la dist/

echo "\nDry run publish..."
npm pack --dry-run

echo "\nVerifying login..."
npm whoami
```

---

## Version Management

### Semantic Versioning (SemVer)

Follow [Semantic Versioning](https://semver.org/) format: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes (backward compatible)

Examples:
- `1.0.0` → `1.0.1` (bug fix)
- `1.0.0` → `1.1.0` (new feature)
- `1.0.0` → `2.0.0` (breaking change)

### Pre-release Versions

- **Alpha**: `1.0.0-alpha.1`
- **Beta**: `1.0.0-beta.1`
- **Release Candidate**: `1.0.0-rc.1`

### Updating Version

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major

# Pre-release
npm version prerelease --preid=alpha
```

This automatically:
- Updates `package.json` version
- Creates a git commit
- Creates a git tag

### Publishing New Versions

After updating version:

```bash
# Build
bun run build

# Publish
npm publish
```

---

## Troubleshooting

### Issue 1: "You do not have permission to publish"

**Solution:**
- Check you're logged in: `npm whoami`
- Verify package name isn't already taken
- For scoped packages, ensure you own the scope
- For organizations, ensure you have publish permissions

### Issue 2: "Package name already exists"

**Solution:**
- Use a scoped package name: `@your-username/package-name`
- Or choose a different name
- Check if you can transfer ownership (if it's your old package)

### Issue 3: "Invalid package.json"

**Solution:**
- Validate JSON syntax: `cat package.json | jq .`
- Ensure required fields are present
- Check for typos in field names

### Issue 4: "Missing LICENSE file"

**Solution:**
- Create a LICENSE file in project root
- Use a standard license (MIT, Apache, etc.)
- Or set `"license": "UNLICENSED"` in package.json (not recommended for public packages)

### Issue 5: Build fails before publish

**Solution:**
```bash
# Clean and rebuild
rm -rf dist node_modules/.cache
bun run build

# Check for TypeScript errors
bun run type-check
```

### Issue 6: Published package missing files

**Solution:**
- Check `files` array in package.json
- Verify `.npmignore` isn't excluding needed files
- Use `npm pack` to preview what will be published

### Issue 7: Cannot install private package

**Solution:**
- Verify authentication: `npm whoami`
- Check registry configuration: `npm config get registry`
- For GitHub Packages, ensure `.npmrc` is configured
- Verify you have access to the organization/package

### Issue 8: Version already published

**Solution:**
- Update version: `npm version patch`
- Or use pre-release: `npm version prerelease`

---

## Best Practices

### 1. Use Scoped Package Names

Prefer scoped names to avoid conflicts:

```json
{
  "name": "@your-org/ilamy-calendar"
}
```

### 2. Keep Package Size Small

- Use `files` field to include only necessary files
- Exclude source maps if not needed
- Use peerDependencies for common dependencies

### 3. Maintain Good Documentation

- Write comprehensive README.md
- Include usage examples
- Document all exported APIs
- Add changelog (CHANGELOG.md)

### 4. Use CI/CD for Publishing

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
      - run: bun run build
      - uses: actions/setup-node@v3
        with:
          registry-url: 'https://registry.npmjs.org'
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

### 5. Version Strategy

- Start with `1.0.0` for stable releases
- Use `0.x.x` for development/experimental
- Follow semantic versioning strictly
- Tag releases in git

### 6. Security

- Never commit secrets or API keys
- Review dependencies for vulnerabilities
- Use `.npmignore` to exclude sensitive files
- Keep dependencies up-to-date

### 7. Testing Before Publish

```bash
# Create test installation
npm pack
mkdir test-install
cd test-install
npm init -y
npm install ../your-package-1.0.0.tgz

# Test imports
node -e "const pkg = require('your-package'); console.log(pkg)"
```

---

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Verdaccio Documentation](https://verdaccio.org/docs/what-is-verdaccio)

---

**Last Updated**: Based on current package configuration and npm best practices

