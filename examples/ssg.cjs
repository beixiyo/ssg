const path = require('node:path')
const { ssg } = require('@jl-org/ssg')
const puppeteer = require('puppeteer-core')


const PORT = '4173'
main()

async function main() {
  await ssg({
    port: PORT,
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
    ],
    onBeforeOpenPage(page) {
      page.setCookie(genCookies('localhost'))
    }
  })

  process.exit(0)
}

function genCookies(domain) {
  return {
    name: 'no-img',
    value: 'no-img',
    domain,
  }
}