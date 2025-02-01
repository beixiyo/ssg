import type { Browser } from 'puppeteer-core'
import { minify, type Options } from 'html-minifier-terser'
import { writeFileSync } from 'fs'


export async function genHtml(
  {
    url,
    target,
    needMinify,
    minifyOptions,
    browser,
    kill,
  }: GenHtmlParams
) {
  try {
    const page = await browser.newPage()

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 100000
    })

    let html = await page.content()
    if (needMinify) {
      html = await minify(html, minifyOptions)
    }
    html = html.replace(new RegExp(url, 'g'), '')

    writeFileSync(target, html)
    await page.close()

    console.log('SSG 成功')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    kill?.()
  }
}

export type GenHtmlParams = {
  url: string
  target: string
  needMinify: boolean
  minifyOptions: Options
  browser: Browser
  kill: () => void
}