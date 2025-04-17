import type { Browser } from 'puppeteer-core'
import { minify, type Options } from 'html-minifier-terser'
import { writeFileSync } from 'fs'
const { parse } = require('url')


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
    const urlObj = parse(url)
    const curUrl = `${urlObj.protocol}//${urlObj.host}`
    const page = await browser.newPage()

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 100000
    })

    let html = await page.content()
    if (needMinify) {
      html = await minify(html, minifyOptions)
    }
    html = html.replace(new RegExp(curUrl, 'g'), '')

    writeFileSync(target, html)
    await page.close()

    console.log(`${url} SSG 成功`)
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