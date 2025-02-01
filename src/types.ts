import { Browser, Page } from 'puppeteer-core'
import { type Options } from 'html-minifier-terser'

export interface SSGOptions {
  ssgPages: SSGPage[]

  /**
   * 启动服务器的端口
   * @default '4173'
   */
  port?: string
  /**
   * spawn 启动服务器的命令的第一个参数
   * @default 'npx'
   */
  startServerCmd?: string
  /**
   * spawn 启动服务器的命令的参数列表
   * @default 
   * ['vite', 'preview', '--port', PORT]
   */
  startServerArgs?: readonly string[]

  /**
   * 是否需要压缩 HTML 文件
   * @default true
   */
  needMinify?: boolean
  /**
   * 压缩 HTML 文件的配置
   * @default
   * {
   *   collapseWhitespace: true, // 删除多余的空格
   *   removeComments: true, // 删除注释
   *   removeAttributeQuotes: false, // 删除属性的引号（当安全时）
   *   minifyCSS: true, // 压缩内联 CSS
   *   minifyJS: true, // 压缩内联 JS
   * }
   */
  minifyOptions?: Options

  /**
   * 创建浏览器实例的函数，默认需要你自行下载 puppeteer-core 或者 puppeteer
   * ### 因为 puppeteer 会自动下载浏览器，所以提供此配置。你可以使用自己浏览器的路径，节省内存
   * @example
   * await puppeteer.launch({ headless: true, ... })
   */
  createBrowser: () => Promise<Browser>
  /**
   * 页面打开前的回调函数，可以用来设置一些页面的配置
   */
  onBeforeOpenPage?: (page: Page) => Promise<void>
}

export type SSGPage = {
  /**
   * 页面地址
   */
  url: string
  /**
   * SSG 后存储的路径
   * @example path.resolve(__dirname, '../dist/index.html')
   */
  target: string
}