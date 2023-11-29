import { type Ref, onMounted, ref, watch, toRaw } from 'vue'
import { type SyncStorageKey, type SyncStorageSchema, getSyncStorage, setSyncStorage } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'
import { isEqual } from 'lodash-es'

export function useChromeStorage <
  Key extends SyncStorageKey
> (key: Key) {
  const value: Ref<SyncStorageSchema[Key] | null> = ref(null)

  onMounted(async () => {
    value.value = await getSyncStorage(key)
  })

  useChromeStorageListener((changes) => {
    if (!(key in changes)) return
    const { newValue, oldValue } = changes[key]
    if (isEqual(newValue, oldValue)) return

    value.value = newValue
  })

  watch(value, (newValue, oldValue) => {
    if (newValue == null || oldValue == null) return

    const rawNewValue = toRaw(newValue)
    const rawOldValue = toRaw(oldValue)

    // Must use `toRaw` here to convert Proxy(Array) to a native array
    if (isEqual(rawNewValue, rawOldValue)) return

    setSyncStorage(key, rawNewValue)
  })

  return value
}
