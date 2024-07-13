import { useBrowser } from '../helpers/puppeteer'
import { useOptionsOperation } from '../helpers/useOptionsOperation'

describe('Enable in options page', () => {
  const { getOptionsPage, getOptionsSyncStorage } = useBrowser()
  const { clickSidebarItem, toggleEnabled } = useOptionsOperation({
    getOptionsPage,
  })

  test('should be able to enable and disable', async () => {
    await clickSidebarItem('setting')
    await toggleEnabled(false)
    expect((await getOptionsSyncStorage()).enabled).toBe(false)

    await toggleEnabled(true)
    expect((await getOptionsSyncStorage()).enabled).toBe(true)

    await toggleEnabled(false)
    expect((await getOptionsSyncStorage()).enabled).toBe(false)

    await toggleEnabled(true)
    expect((await getOptionsSyncStorage()).enabled).toBe(true)
  })
})
