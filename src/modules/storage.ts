import { cloneDeep } from 'lodash-es'
import { type BlockMethod } from './BlockMethod'
import { normalizeRulesString, type RuleType } from '../pages/content/modules/rule'

export const ENABLED_STORAGE_KEY = 'enabled'
export const DEBUGGER_ENABLED_STORAGE_KEY = 'debuggerEnabled'
export const JOB_TITLE_RULES_STORAGE_KEY = 'jobTitleRules'
export const COMPANY_NAME_RULES_STORAGE_KEY = 'companyNameRules'
export const BLOCK_METHOD_KEY = 'blockMethod'

export interface SyncStorageSchema {
  [ENABLED_STORAGE_KEY]: boolean
  [DEBUGGER_ENABLED_STORAGE_KEY]: boolean
  [BLOCK_METHOD_KEY]: BlockMethod
  [JOB_TITLE_RULES_STORAGE_KEY]: string
  [COMPANY_NAME_RULES_STORAGE_KEY]: string
}

export const syncStorageDefaultValues: SyncStorageSchema = {
  [ENABLED_STORAGE_KEY]: true,
  [DEBUGGER_ENABLED_STORAGE_KEY]: false,
  [BLOCK_METHOD_KEY]: 'opacity',
  [JOB_TITLE_RULES_STORAGE_KEY]: '',
  [COMPANY_NAME_RULES_STORAGE_KEY]: '',
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
> (key: Key, value: SyncStorageSchema[Key]) {
  await chrome.storage.sync.set({ [key]: value })
}

export async function loadIsEnabled () {
  return await getSyncStorage(ENABLED_STORAGE_KEY)
}

export async function saveIsEnabled (isEnabled: boolean) {
  await setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export async function loadIsDebuggerEnabled () {
  return await getSyncStorage(DEBUGGER_ENABLED_STORAGE_KEY)
}

export async function saveIsDebuggerEnabled (isEnabled: boolean) {
  await setSyncStorage(DEBUGGER_ENABLED_STORAGE_KEY, isEnabled)
}

export async function loadBlockMethod () {
  return await getSyncStorage(BLOCK_METHOD_KEY)
}

export async function saveBlockMethod (blockMethod: BlockMethod) {
  await setSyncStorage(BLOCK_METHOD_KEY, blockMethod)
}

function getStorageKeyByRuleType (type: RuleType) {
  return ({
    jobTitle: JOB_TITLE_RULES_STORAGE_KEY,
    companyName: COMPANY_NAME_RULES_STORAGE_KEY,
  } as const)[type]
}

export async function loadRules (type: RuleType) {
  const key = getStorageKeyByRuleType(type)
  return await getSyncStorage(key)
}

export async function saveRules (type: RuleType, rules: string) {
  const key = getStorageKeyByRuleType(type)
  await setSyncStorage(
    key,
    normalizeRulesString(rules)
  )
}

export async function appendRule (type: RuleType, rule: string) {
  const rules = await loadRules(type)

  await saveRules(type, `${rules}\n${rule}`)
}
