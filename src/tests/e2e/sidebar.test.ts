import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { useBrowser } from '../helpers/puppeteer'
import { useOptionsOperation } from '../helpers/useOptionsOperation'

describe('Sidebar', () => {
  const { getOptionsPage } = useBrowser()
  const { clickSidebarItem } = useOptionsOperation({
    getOptionsPage,
  })

  test('should show different section when clicking a sidebar item', async () => {
    const page = await getOptionsPage()
    await clickSidebarItem('/about')
    expect(
      await (
        await page.$(`[data-testid=${OPTIONS_TEST_IDS.sectionAbout}]`)
      )?.isVisible()
    ).toBe(true)

    await clickSidebarItem('/subscription')
    expect(
      await (
        await page.$(`[data-testid=${OPTIONS_TEST_IDS.sectionSubscription}]`)
      )?.isVisible()
    ).toBe(true)

    await clickSidebarItem('/setting')
    expect(
      await (
        await page.$(`[data-testid=${OPTIONS_TEST_IDS.sectionSetting}]`)
      )?.isVisible()
    ).toBe(true)
  })
})
