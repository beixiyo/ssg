import type { SSGOptions } from './types'
import type { PartRequired } from '@jl-org/ts-tool'


export function getOpts(opts: SSGOptions): PartRequired<
  SSGOptions,
  | 'port'
  | 'startServerCmd'
  | 'startServerArgs'
  | 'needMinify'
  | 'minifyOptions'
> {
  const port = opts.port || '4173'

  return {
    port,
    startServerCmd: 'npx',
    startServerArgs: ['vite', 'preview', '--port', port],
    needMinify: true,
    minifyOptions: {
      collapseWhitespace: true, // 删除多余的空格
      removeComments: true, // 删除注释
      removeAttributeQuotes: false, // 删除属性的引号（当安全时）
      minifyCSS: true, // 压缩内联 CSS
      minifyJS: true, // 压缩内联 JS
    },
    ...opts
  }
}