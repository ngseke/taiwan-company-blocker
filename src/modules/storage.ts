import { type PatternType, type Pattern } from '../pages/content/modules/pattern'
import { COMPANY_NAME_PATTERNS_STORAGE_KEY, ENABLED_STORAGE_KEY, JOB_TITLE_PATTERNS_STORAGE_KEY } from './constants'

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

function getStorageKeyByPatternType (type: PatternType) {
  return {
    jobTitle: JOB_TITLE_PATTERNS_STORAGE_KEY,
    companyName: COMPANY_NAME_PATTERNS_STORAGE_KEY,
  }[type]
}

export async function loadPatterns (type: PatternType) {
  const key = getStorageKeyByPatternType(type)
  return await getSyncStorage(key, [] as Pattern[])
}

export async function savePatterns (type: PatternType, patterns: Pattern[]) {
  const key = getStorageKeyByPatternType(type)
  await setSyncStorage(key, patterns)
}
