import puppeteer, { type Page, type Browser } from 'puppeteer'
import { EXTENSION_ID } from '../../modules/constants'

const extensionPath = 'dist'

export async function createBrowser () {
  const browser = await puppeteer.launch({
    headless: process.env.VITE_PUPPETEER_HEADLESS !== 'false',
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  })

  return browser
}

export async function createPage (
  browser: Browser,
  { url }: { url: string }
) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 900 })
  await page.goto(url)
  await page.reload({ waitUntil: 'networkidle2' })

  return page
}

function useBaseBrowser ({ getBrowser, url }: {
  getBrowser: () => Browser
  url: string
}) {
  let page: Page | undefined

  afterEach(async () => {
    page = undefined
  })

  async function createPage () {
    const browser = getBrowser()
    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 900 })
    await page.goto(url, { waitUntil: 'networkidle2' })

    return page
  }

  async function getPage () {
    if (!page) {
      page = await createPage()
    }
    await page.bringToFront()
    return page
  }

  async function getSyncStorage () {
    const page = await getPage()
    return await page.evaluate(
      async () => await chrome.storage.sync.get(null)
    )
  }

  async function getLocalStorage () {
    const page = await getPage()
    return await page.evaluate(
      async () => await chrome.storage.local.get(null)
    )
  }

  return {
    getPage,
    getSyncStorage,
    getLocalStorage,
  }
}

export function useBrowser () {
  let browser: Browser | undefined
  beforeEach(async () => {
    browser = await createBrowser()
  })

  afterEach(async () => {
    await browser?.close()
    browser = undefined
  })

  function getBrowser () {
    if (!browser) throw new Error()
    return browser
  }

  const {
    getPage: getOptionsPage,
    getSyncStorage: getOptionsSyncStorage,
    getLocalStorage: getOptionsLocalStorage,
  } = useBaseBrowser({
    url: `chrome-extension://${EXTENSION_ID}/src/pages/options/index.html`,
    getBrowser,
  })

  const {
    getPage: getPopupPage,
    getSyncStorage: getPopupSyncStorage,
    getLocalStorage: getPopupLocalStorage,
  } = useBaseBrowser({
    url: `chrome-extension://${EXTENSION_ID}/src/pages/popup/index.html`,
    getBrowser,
  })

  return {
    getBrowser,

    getOptionsPage,
    getPopupPage,

    getOptionsSyncStorage,
    getOptionsLocalStorage,

    getPopupSyncStorage,
    getPopupLocalStorage,
  }
}
