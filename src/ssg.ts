import { genHtml, type GenHtmlParams } from './genHtml'
import { getOpts } from './getOpts'
import { startVitePreview } from './startServer'
import type { SSGOptions } from './types'


export async function ssg(ssgOptions: SSGOptions) {
  const opts = getOpts(ssgOptions)

  const killProcess = await startVitePreview(
    opts.startServerCmd,
    opts.startServerArgs
  )

  const browser = await opts.createBrowser()

  opts.ssgPages.forEach((page, index) => {
    const params: GenHtmlParams = {
      url: page.url,
      target: page.target,
      needMinify: opts.needMinify,
      minifyOptions: opts.minifyOptions,
      browser,
      kill: index === opts.ssgPages.length - 1
        ? () => {
          browser.close()
          killProcess()
        }
        : () => { },
    }

    genHtml(params)
  })
}