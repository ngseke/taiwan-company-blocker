import { ENABLED_STORAGE_KEY } from './constants'

async function getSyncStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.sync.get(key))[key] ?? defaultValue
}

async function setSyncStorage <T> (key: string, value: T) {
  await chrome.storage.sync.set({ [key]: value })
}

export const loadIsEnabled = async () => {
  return await getSyncStorage(ENABLED_STORAGE_KEY, true)
}

export const saveIsEnabled = async (isEnabled: boolean) => {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}
