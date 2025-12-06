# Project Setup

Configure your project to work with ScopeInspect Calendar. This guide covers Tailwind CSS setup, TypeScript configuration, and framework-specific instructions.

## Tailwind CSS Configuration

ScopeInspect Calendar requires Tailwind CSS for styling. Follow these steps to configure it:

### 1. Install Tailwind CSS

```bash
# Using npm
npm install -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using yarn
yarn add -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using pnpm
pnpm add -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7

# Using bun
bun add -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

### 2. Initialize Tailwind Config

```bash
npx tailwindcss init
```

### 3. Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/scope-inspect-calendar/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
```

### 4. Add Tailwind Directives

In your main CSS file (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Import CSS in Your App

```tsx
import './index.css'
```

## TypeScript Configuration

### Basic Setup

If using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Path Aliases (Optional)

For cleaner imports, configure path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Framework-Specific Setup

### Next.js

#### 1. Install Dependencies

```bash
npm install scope-inspect-calendar
npm install -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

#### 2. Configure Tailwind

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/scope-inspect-calendar/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
```

#### 3. Add Tailwind to Global CSS

In `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4. Use the Calendar

```tsx
'use client'

import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

export default function Page() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ]

  return <ScopeInspectCalendar events={events} />
}
```

**Note**: Use `'use client'` directive since the calendar is a client component.

### Astro

#### 1. Install Dependencies

```bash
npm install scope-inspect-calendar
npm install -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7 @astrojs/react
```

#### 2. Configure Astro

In `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
```

#### 3. Use the Calendar

Create a React component (e.g., `src/components/Calendar.tsx`):

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
  },
]

export default function Calendar() {
  return <ScopeInspectCalendar events={events} />
}
```

Use in an Astro page:

```astro
---
import Layout from '../layouts/Layout.astro'
import Calendar from '../components/Calendar.tsx'
---

<Layout title="Calendar">
  <Calendar client:load />
</Layout>
```

### Vite

#### 1. Install Dependencies

```bash
npm install scope-inspect-calendar
npm install -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

#### 2. Configure Tailwind

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/scope-inspect-calendar/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
```

#### 3. Add Tailwind to CSS

In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4. Import CSS

In `src/main.tsx`:

```tsx
import './index.css'
```

### Create React App

#### 1. Install Dependencies

```bash
npm install scope-inspect-calendar
npm install -D tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

#### 2. Configure Tailwind

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/scope-inspect-calendar/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
```

#### 3. Add Tailwind to CSS

In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## CSS Variables (Optional)

Customize calendar colors using CSS variables:

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
}

.dark {
  --calendar-primary: #60a5fa;
  --calendar-secondary: #a78bfa;
  --calendar-background: #1f2937;
  --calendar-border: #374151;
}
```

## PostCSS Configuration

If using PostCSS, ensure it's configured:

```js
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Verification

Test your setup with a simple calendar:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function App() {
  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar events={[]} />
    </div>
  )
}
```

If the calendar renders correctly, your setup is complete!

## Troubleshooting

### Tailwind Styles Not Applied

- Ensure Tailwind is included in your `content` paths
- Check that CSS is imported in your entry file
- Verify PostCSS is configured correctly

### TypeScript Errors

- Ensure TypeScript version is compatible
- Check `tsconfig.json` configuration
- Verify type definitions are installed

### Build Errors

- Check all peer dependencies are installed
- Verify Tailwind CSS version compatibility
- Ensure build tools are properly configured

## Next Steps

- **[Quick Start](./quick-start.md)** - Create your first calendar
- **[Basic Usage](./basic-usage.md)** - Learn the fundamentals
- **[Calendar Views](../guides/calendar-views.md)** - Explore different views

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Installation](./installation.md)
- [Quick Start](./quick-start.md)
- [Basic Usage](./basic-usage.md)
