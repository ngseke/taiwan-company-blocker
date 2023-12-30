import { type Ref, onMounted, ref, toRaw, computed } from 'vue'
import { type StorageKey, type StorageSchema, getStorage, setStorage } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'
import { isEqual } from 'lodash-es'

export function useChromeStorage <
  Key extends StorageKey
> (key: Key) {
  const value: Ref<StorageSchema[Key] | null> = ref(null)

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

      await setStorage(key, rawNewValue)
      value.value = newValue
    },
  })

  onMounted(async () => {
    value.value = await getStorage(key)
  })

  useChromeStorageListener((changes) => {
    if (!(key in changes)) return
    const { newValue, oldValue } = changes[key]
    if (isEqual(newValue, oldValue)) return

    value.value = newValue
  })

  return computedValue
}
