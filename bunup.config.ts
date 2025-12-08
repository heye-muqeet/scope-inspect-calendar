import { defineConfig } from 'bunup'
import { unused } from 'bunup/plugins'

export default defineConfig({
  plugins: [
    unused(),
    {
      name: 'replace-node-builtins',
      setup(build) {
        // Replace Node.js built-in imports with browser-compatible polyfills
        const nodeBuiltins = [
          'node:module',
          'node:fs',
          'node:path',
          'node:url',
          'node:util',
          'node:stream',
          'node:buffer',
          'node:events',
          'node:crypto',
          'node:os',
          'node:process',
          'module',
          'fs',
          'path',
          'url',
          'util',
          'stream',
          'buffer',
          'events',
          'crypto',
          'os',
          'process',
        ]

        nodeBuiltins.forEach((id) => {
          // Escape special regex characters
          const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          
          // Handle both direct imports and require() calls
          build.onResolve(
            {
              filter: new RegExp(`^${escapedId}$`),
            },
            () => ({
              path: id,
              namespace: 'node-builtin',
            })
          )
          
          // Also handle imports with query strings or fragments
          build.onResolve(
            {
              filter: new RegExp(`^${escapedId}(\\?.*)?(#.*)?$`),
            },
            () => ({
              path: id,
              namespace: 'node-builtin',
            })
          )
        })

        build.onLoad({ filter: /.*/, namespace: 'node-builtin' }, (args) => {
          // Provide minimal polyfills for common Node.js exports
          if (args.path === 'node:module' || args.path === 'module') {
            return {
              contents: `
                export function createRequire() {
                  return function() {
                    throw new Error('createRequire is not available in browser environment');
                  };
                }
                export default {};
              `,
              loader: 'js',
            }
          }

          // For all other Node.js built-ins, export empty objects
          return {
            contents: 'export default {};',
            loader: 'js',
          }
        })
      },
    },
  ],
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  minify: true,
  clean: true,
  sourcemap: true,
  platform: 'browser',
  external: ['react', 'react-dom'],
  // Define replacements for Node.js globals
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
