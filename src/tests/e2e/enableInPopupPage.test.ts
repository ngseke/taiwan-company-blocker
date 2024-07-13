import { useBrowser } from '../helpers/puppeteer'
import { usePopupOperation } from '../helpers/usePopupOperation'

describe('Enable in options page', () => {
  const { getPopupPage, getPopupSyncStorage } = useBrowser()
  const { toggleEnabled } = usePopupOperation({
    getPopupPage,
  })

  test('should be able to enable and disable', async () => {
    await toggleEnabled(false)
    expect((await getPopupSyncStorage()).enabled).toBe(false)

    await toggleEnabled(true)
    expect((await getPopupSyncStorage()).enabled).toBe(true)

    await toggleEnabled(false)
    expect((await getPopupSyncStorage()).enabled).toBe(false)

    await toggleEnabled(true)
    expect((await getPopupSyncStorage()).enabled).toBe(true)
  })
})
