import { cloneDeep } from 'lodash-es'
import { type BlockMethod } from '../pages/content/modules/Blocker'
import { type PatternType, type Pattern } from '../pages/content/modules/pattern'

export const ENABLED_STORAGE_KEY = 'enabled'
export const JOB_TITLE_PATTERNS_STORAGE_KEY = 'jobTitlePatterns'
export const COMPANY_NAME_PATTERNS_STORAGE_KEY = 'companyNamePatterns'
export const BLOCK_METHOD_KEY = 'blockMethod'

export interface SyncStorageSchema {
  [ENABLED_STORAGE_KEY]: boolean
  [JOB_TITLE_PATTERNS_STORAGE_KEY]: Pattern[]
  [COMPANY_NAME_PATTERNS_STORAGE_KEY]: Pattern[]
  [BLOCK_METHOD_KEY]: BlockMethod
}

export const syncStorageDefaultValues: SyncStorageSchema = {
  [ENABLED_STORAGE_KEY]: true,
  [JOB_TITLE_PATTERNS_STORAGE_KEY]: [],
  [COMPANY_NAME_PATTERNS_STORAGE_KEY]: [],
  [BLOCK_METHOD_KEY]: 'opacity',
}

export type SyncStorageKey = keyof SyncStorageSchema

export async function getSyncStorage <
  Key extends SyncStorageKey
> (key: Key): Promise<SyncStorageSchema[Key]> {
  return (await chrome.storage.sync.get(key))[key] ??
    cloneDeep(syncStorageDefaultValues[key])
}

export async function setSyncStorage<
  Key extends SyncStorageKey
> (key: string, value: SyncStorageSchema[Key]) {
  await chrome.storage.sync.set({ [key]: value })
}

export async function loadIsEnabled () {
  return await getSyncStorage(ENABLED_STORAGE_KEY)
}

export async function saveIsEnabled (isEnabled: boolean) {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

function getStorageKeyByPatternType (type: PatternType) {
  return ({
    jobTitle: JOB_TITLE_PATTERNS_STORAGE_KEY,
    companyName: COMPANY_NAME_PATTERNS_STORAGE_KEY,
  } as const)[type]
}

export async function loadPatterns (type: PatternType) {
  const key = getStorageKeyByPatternType(type)
  return await getSyncStorage(key)
}

export async function savePatterns (type: PatternType, patterns: Pattern[]) {
  const key = getStorageKeyByPatternType(type)
  await setSyncStorage(key, patterns)
}

export async function appendPattern (type: PatternType, pattern: Pattern) {
  const patterns = await loadPatterns(type)

  patterns.push(pattern)
  await savePatterns(type, patterns)
}
