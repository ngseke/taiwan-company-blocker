import { beforeEach, expect, test, vi } from 'vitest'
import { loadIsEnabled, saveIsEnabled } from './storage'
import { ENABLED_STORAGE_KEY } from './constants'
import { mockChrome } from '../../__tests__/chrome'

beforeEach(() => {
  // To ensure that Chrome is mocked in every test
  vi.stubGlobal('chrome', undefined)
})

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
