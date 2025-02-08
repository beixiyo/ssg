# 一键把单页应用转换成静态网站

支持任何前端框架，如 React、Vue、Angular、Svelte 等

## 安装

```bash
npm i @jl-org/ssg -D
```


## 快速上手

```bash
touch scripts/ssg.cjs
node scripts/ssg.cjs
```

`scripts/ssg.cjs`
```js
const path = require('node:path')
const { ssg } = require('@jl-org/ssg')
const puppeteer = require('puppeteer-core')


const PORT = '4173'
main()

async function main() {
  await ssg({
    port: PORT,
    /**
     * 创建浏览器实例的函数，默认需要你自行下载 puppeteer-core 或者 puppeteer
     * ### 因为 puppeteer 会自动下载浏览器，所以提供此配置。你可以使用自己浏览器的路径，节省内存
     * @example
     * puppeteer.launch({ headless: true, ... })
     */
    createBrowser: () => puppeteer.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: true
    }),
    ssgPages: [
      {
        url: `http://localhost:${PORT}`,
        target: path.resolve(__dirname, '../dist/index.html')
      },
      {
        url: `http://localhost:${PORT}/pricing`,
        target: path.resolve(__dirname, '../dist/pricing.html')
      },
      {
        url: `http://localhost:${PORT}/company/about`,
        target: path.resolve(__dirname, '../dist/about.html')
      },
    ]
  })

  process.exit(0)
}
```

---


## 配置项

```ts

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
```

---


## 原理

- 项目打包后有一个 `dist` 文件夹，此脚本会启动一个本地服务器，默认用 `vite preview` 来查看
- 然后调用 puppeteer 模拟打开浏览器，访问每个页面，生成静态 HTML 文件
- 最后将生成的 HTML 文件放到指定目录，并替换掉原来的 HTML 文件