# Next.js Configuration for scope-inspect-calendar

If you're experiencing errors related to `node:module` or other Node.js built-ins when using this package in Next.js, follow these steps:

## Solution 1: Update the Package (Recommended)

1. **Clear your Next.js cache:**

   ```bash
   rm -rf .next
   # or on Windows:
   rmdir /s /q .next
   ```

2. **Reinstall the package:**

   ```bash
   npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main --force
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

## Solution 2: Configure Next.js (If Solution 1 doesn't work)

If you still encounter issues, add this to your `next.config.js` or `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore Node.js built-ins in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        url: false,
        os: false,
        events: false,
      }
    }
    return config
  },
  // For Turbopack (Next.js 13+)
  experimental: {
    turbo: {
      resolveAlias: {
        'node:module': false,
        'node:fs': false,
        'node:path': false,
        'node:crypto': false,
        'node:stream': false,
        'node:buffer': false,
        'node:util': false,
        'node:url': false,
        'node:os': false,
        'node:events': false,
      },
    },
  },
}

module.exports = nextConfig
```

## Solution 3: Use Dynamic Imports (If needed)

If the above solutions don't work, you can try importing the calendar component dynamically:

```typescript
import dynamic from 'next/dynamic'

const ScopeInspectCalendar = dynamic(
  () =>
    import('scope-inspect-calendar').then((mod) => mod.ScopeInspectCalendar),
  { ssr: false }
)
```

## Troubleshooting

- **Error persists after updating:** Clear `node_modules` and reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **Turbopack issues:** Try disabling Turbopack temporarily:

  ```bash
  npm run dev -- --no-turbo
  ```

- **Check package version:** Ensure you're using the latest version:
  ```bash
  npm list scope-inspect-calendar
  ```
