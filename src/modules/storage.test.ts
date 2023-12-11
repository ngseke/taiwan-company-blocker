import { ENABLED_STORAGE_KEY, loadIsEnabled, saveIsEnabled } from './storage'
import { mockChrome } from '../../__tests__/chrome'

test('loadIsEnabled', async () => {
  const chrome = mockChrome()
  // Default value
  await expect(loadIsEnabled()).resolves.toBe(true)

  chrome.storage.sync.get = vi.fn().mockResolvedValue({
    [ENABLED_STORAGE_KEY]: false,
  })
  await expect(loadIsEnabled()).resolves.toBe(false)
})

test('saveIsEnabled', async () => {
  const chrome = mockChrome()
  await saveIsEnabled(false)
  expect(chrome.storage.sync.set).toBeCalled()
  await saveIsEnabled(true)
  expect(chrome.storage.sync.set).toBeCalled()
})
