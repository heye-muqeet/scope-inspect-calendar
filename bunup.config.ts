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
          build.onResolve(
            {
              filter: new RegExp(
                `^${id.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`
              ),
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
                  throw new Error('createRequire is not available in browser environment');
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
})
