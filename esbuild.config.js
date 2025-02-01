const esbuild = require('esbuild')

// 打包 CommonJS (cjs)
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.cjs',
    platform: 'node',
    format: 'cjs', // 指定为 CommonJS
    external: ['html-minifier-terser', 'tree-kill'], // 外部依赖
  })
  .catch(() => process.exit(1))

// 打包 ES Module (esm)
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.mjs',
    platform: 'node',
    format: 'esm', // 指定为 ES Module
    external: ['html-minifier-terser', 'tree-kill'], // 外部依赖
  })
  .catch(() => process.exit(1))