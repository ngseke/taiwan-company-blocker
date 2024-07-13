import { type Page } from 'puppeteer'
import { sleep } from './sleep'
import { POPUP_TEST_IDS } from '../../modules/constants'

export function usePopupOperation ({ getPopupPage }: {
  getPopupPage: () => Promise<Page>
}) {
  async function toggleEnabled (value: boolean) {
    const page = await getPopupPage()
    const element = await page.$(`
      [data-testid=${POPUP_TEST_IDS.enableSwitch}]
    `)
    const checkbox = await element?.$('input')
    if (!checkbox) throw new Error('Failed to select the checkbox')
    const isChecked = await checkbox?.evaluate(
      (checkbox) => checkbox.checked
    )
    if (isChecked === value) return
    element?.click()
    await sleep(300)
  }

  return {
    toggleEnabled,
  }
}
