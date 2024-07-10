import { cloneDeep } from 'lodash-es'
import { type BlockMethod } from './BlockMethod'
import { normalizeRulesString, type RuleType } from './rule'
import { type SubscriptionResults, type Subscription } from './Subscription'

export const ENABLED_STORAGE_KEY = 'enabled'
export const DEBUGGER_ENABLED_STORAGE_KEY = 'debuggerEnabled'
export const JOB_TITLE_RULES_STORAGE_KEY = 'jobTitleRules'
export const COMPANY_NAME_RULES_STORAGE_KEY = 'companyNameRules'
export const BLOCK_METHOD_KEY = 'blockMethod'
export const SUBSCRIPTIONS_KEY = 'subscriptions'
export const SUBSCRIPTION_RESULTS_KEY = 'subscriptionResults'

export interface StorageSchema {
  [ENABLED_STORAGE_KEY]: boolean
  [DEBUGGER_ENABLED_STORAGE_KEY]: boolean
  [BLOCK_METHOD_KEY]: BlockMethod
  [JOB_TITLE_RULES_STORAGE_KEY]: string
  [COMPANY_NAME_RULES_STORAGE_KEY]: string
  [SUBSCRIPTIONS_KEY]: Subscription[]
  [SUBSCRIPTION_RESULTS_KEY]: SubscriptionResults
}

export const storageDefaultValues: StorageSchema = {
  [ENABLED_STORAGE_KEY]: true,
  [DEBUGGER_ENABLED_STORAGE_KEY]: false,
  [BLOCK_METHOD_KEY]: 'opacity',
  [JOB_TITLE_RULES_STORAGE_KEY]: '',
  [COMPANY_NAME_RULES_STORAGE_KEY]: '',
  [SUBSCRIPTIONS_KEY]: [],
  [SUBSCRIPTION_RESULTS_KEY]: {},
}

export type StorageKey = keyof StorageSchema

/** Specify storage keys of data that might be too large */
const localStorageKeys = new Set<StorageKey>([
  SUBSCRIPTION_RESULTS_KEY,
  JOB_TITLE_RULES_STORAGE_KEY,
  COMPANY_NAME_RULES_STORAGE_KEY,
])

export async function getStorage <
  Key extends StorageKey
> (key: Key): Promise<StorageSchema[Key]> {
  const value = localStorageKeys.has(key)
    ? (await chrome.storage.local.get(key))[key]
    : (await chrome.storage.sync.get(key))[key]

  return value ?? cloneDeep(storageDefaultValues[key])
}

export async function setStorage<
  Key extends StorageKey
> (key: Key, value: StorageSchema[Key]) {
  if (localStorageKeys.has(key)) {
    await chrome.storage.local.set({ [key]: value })
  } else {
    await chrome.storage.sync.set({ [key]: value })
  }
}

export async function loadIsEnabled () {
  return await getStorage(ENABLED_STORAGE_KEY)
}

export async function saveIsEnabled (isEnabled: boolean) {
  await setStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export async function loadIsDebuggerEnabled () {
  return await getStorage(DEBUGGER_ENABLED_STORAGE_KEY)
}

export async function saveIsDebuggerEnabled (isEnabled: boolean) {
  await setStorage(DEBUGGER_ENABLED_STORAGE_KEY, isEnabled)
}

export async function loadBlockMethod () {
  return await getStorage(BLOCK_METHOD_KEY)
}

export async function saveBlockMethod (blockMethod: BlockMethod) {
  await setStorage(BLOCK_METHOD_KEY, blockMethod)
}

function getStorageKeyByRuleType (type: RuleType) {
  return ({
    jobTitle: JOB_TITLE_RULES_STORAGE_KEY,
    companyName: COMPANY_NAME_RULES_STORAGE_KEY,
  } as const)[type]
}

export async function loadRules (type: RuleType) {
  /**
   * Gets value from Sync Storage **without** default value.
   * This is for backward compatibility.
   */
  async function getStorageSync <
    Key extends StorageKey
  > (key: Key): Promise<StorageSchema[Key] | undefined> {
    return (await chrome.storage.sync.get(key))[key]
  }

  const key = getStorageKeyByRuleType(type)

  /** Legacy rules that are used to be saved in Sync Storage. */
  const legacyRules = await getStorageSync(key)
  const rules = await getStorage(key)

  return legacyRules ?? rules
}

export async function saveRules (type: RuleType, rules: string) {
  const key = getStorageKeyByRuleType(type)

  // Removes legacy rules in Sync Storage
  await chrome.storage.sync.remove(key)
  await setStorage(
    key,
    normalizeRulesString(rules)
  )
}

export async function loadSubscriptions () {
  return await getStorage(SUBSCRIPTIONS_KEY)
}

export async function saveSubscriptions (subscriptions: Subscription[]) {
  await setStorage(SUBSCRIPTIONS_KEY, subscriptions)
}

export async function loadSubscriptionResults () {
  return await getStorage(SUBSCRIPTION_RESULTS_KEY)
}

export async function saveSubscriptionResults (results: SubscriptionResults) {
  await setStorage(SUBSCRIPTION_RESULTS_KEY, results)
}
