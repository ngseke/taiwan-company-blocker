import { type Page } from 'puppeteer'
import { sleep } from './sleep'
import { OPTIONS_TEST_IDS } from '../../modules/constants'

export function useOptionsOperation ({ getOptionsPage }: {
  getOptionsPage: () => Promise<Page>
}) {
  async function clickSidebarItem (value: string) {
    const popupPage = await getOptionsPage()
    const sidebarItem = await popupPage.$(`
      [data-testid=${OPTIONS_TEST_IDS.sidebar}]
      button[data-testid=${value}]
    `)

    await sidebarItem?.click()
    await sleep(100)
  }

  async function toggleEnabled (value: boolean) {
    const page = await getOptionsPage()
    const checkbox = await page.$(`
      [data-testid=${OPTIONS_TEST_IDS.enableSwitch}]
      input
    `)
    if (!checkbox) throw new Error('Failed to select the checkbox')
    const isChecked = await checkbox?.evaluate(
      (checkbox) => (checkbox as HTMLInputElement).checked
    )
    if (isChecked === value) return
    checkbox?.click()
    await sleep(300)
  }

  async function typeInEditor (
    testId: string,
    value: string,
    isProgrammatically = false
  ) {
    const page = await getOptionsPage()
    const editor = await page.$(`[data-testid=${testId}] [contenteditable]`)
    await editor?.focus()
    if (isProgrammatically) {
      await editor?.evaluate(($, value) => {
        $.innerHTML = value
        const event = new Event('input', { bubbles: true })
        $.dispatchEvent(event)
      }, value)
    } else {
      await editor?.type(value)
    }
  }

  async function getEditorLines (testId: string) {
    const page = await getOptionsPage()
    const editor = await page.$(`[data-testid=${testId}] [contenteditable]`)

    return await editor?.evaluate((el) =>
      [...el.querySelectorAll('& > *')]
        .map((line) => line?.textContent)
    )
  }

  async function clickRulesSaveButton () {
    const page = await getOptionsPage()
    const button = await page.$(
      `[data-testid=${OPTIONS_TEST_IDS.rulesSaveButton}]`
    )
    await button?.click()
  }

  return {
    clickSidebarItem,
    toggleEnabled,
    typeInEditor,
    getEditorLines,
    clickRulesSaveButton,
  }
}
