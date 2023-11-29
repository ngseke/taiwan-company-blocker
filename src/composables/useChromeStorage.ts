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

  watch(value, (value) => {
    if (value == null) return

    // Must use `toRaw` here to convert Proxy(Array) to a native array
    setSyncStorage(key, toRaw(value))
  })

  return value
}
