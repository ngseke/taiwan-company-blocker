import { type Ref, onMounted, ref, toRaw, computed } from 'vue'
import { type SyncStorageKey, type SyncStorageSchema, getSyncStorage, setSyncStorage } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'
import { isEqual } from 'lodash-es'

export function useChromeStorage <
  Key extends SyncStorageKey
> (key: Key) {
  const value: Ref<SyncStorageSchema[Key] | null> = ref(null)

  const computedValue = computed({
    get () {
      return value.value
    },
    async set (newValue) {
      const oldValue = value.value
      if (newValue == null || oldValue == null) return

      // Must use `toRaw` here to convert Proxy(Array) to a native array
      const rawNewValue = toRaw(newValue)
      const rawOldValue = toRaw(oldValue)

      if (isEqual(rawNewValue, rawOldValue)) return

      await setSyncStorage(key, rawNewValue)
      value.value = newValue
    },
  })

  onMounted(async () => {
    value.value = await getSyncStorage(key)
  })

  useChromeStorageListener((changes) => {
    if (!(key in changes)) return
    const { newValue, oldValue } = changes[key]
    if (isEqual(newValue, oldValue)) return

    value.value = newValue
  })

  return computedValue
}
