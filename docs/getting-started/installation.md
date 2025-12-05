# Installation

This guide will help you install ScopeInspect Calendar in your React project.

## Prerequisites

Before installing ScopeInspect Calendar, ensure you have:

- **React** 19.1.0 or higher
- **React DOM** 19.1.0 or higher
- **Tailwind CSS** 4.1.11 or higher
- **tailwindcss-animate** 1.0.7 or higher
- **TypeScript** (recommended, but not required)

## Package Installation

Install ScopeInspect Calendar using your preferred package manager:

### Using npm

```bash
npm install scope-inspect-calendar
```

### Using yarn

```bash
yarn add scope-inspect-calendar
```

### Using pnpm

```bash
pnpm add scope-inspect-calendar
```

### Using bun

```bash
bun add scope-inspect-calendar
```

## Peer Dependencies

ScopeInspect Calendar requires the following peer dependencies. Make sure they are installed in your project:

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

## Next Steps

Once installation is complete, proceed to:

1. **[Project Setup](./project-setup.md)** - Configure Tailwind CSS and TypeScript
2. **[Quick Start](./quick-start.md)** - Create your first calendar
3. **[Basic Usage](./basic-usage.md)** - Learn the fundamentals

## Troubleshooting

### Common Installation Issues

**Issue: Peer dependency warnings**

If you see warnings about peer dependencies, ensure all required packages are installed at the correct versions.

**Issue: TypeScript errors**

Make sure TypeScript is properly configured. See [Project Setup](./project-setup.md) for details.

**Issue: Tailwind CSS not working**

Ensure Tailwind CSS is properly configured in your project. The calendar requires Tailwind CSS for styling.

## Framework-Specific Setup

### Next.js

See the [Next.js example](../examples/nextjs-example.md) for framework-specific setup instructions.

### Astro

See the [Astro example](../examples/astro-example.md) for framework-specific setup instructions.

### Vite

The calendar works with Vite out of the box. Just ensure Tailwind CSS is configured.

### Create React App

If using Create React App, you may need to configure Tailwind CSS manually or use CRACO.

## Version Compatibility

| ScopeInspect Calendar | React | React DOM | Tailwind CSS |
|----------------------|-------|-----------|--------------|
| 1.1.x                | ^19.1.0 | ^19.1.0   | ^4.1.11      |

## Related Documentation

- [Quick Start Guide](./quick-start.md)
- [Project Setup](./project-setup.md)
- [Basic Usage](./basic-usage.md)

