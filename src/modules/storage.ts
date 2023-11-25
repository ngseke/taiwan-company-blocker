import { type Platforms, ensurePlatforms, generateDefaultPlatforms } from '../pages/content/modules/platform'
import { ENABLED_STORAGE_KEY, PLATFORMS_STORAGE_KEY } from './constants'

async function getSyncStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.sync.get(key))[key] ?? defaultValue
}

async function setSyncStorage <T> (key: string, value: T) {
  await chrome.storage.sync.set({ [key]: value })
}

export async function loadIsEnabled () {
  return await getSyncStorage(ENABLED_STORAGE_KEY, true)
}

export async function saveIsEnabled (isEnabled: boolean) {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export async function loadPlatforms () {
  return ensurePlatforms(
    await getSyncStorage(PLATFORMS_STORAGE_KEY, generateDefaultPlatforms())
  )
}

export async function savePlatforms (platforms: Partial<Platforms>) {
  await setSyncStorage(PLATFORMS_STORAGE_KEY, ensurePlatforms(platforms))
}
