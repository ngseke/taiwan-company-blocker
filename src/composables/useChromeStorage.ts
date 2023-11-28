import { type Ref, onMounted, ref, watch } from 'vue'
import { type SyncStorageKey, type SyncStorageSchema, getSyncStorage, setSyncStorage } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'

export function useChromeStorage <
  Key extends SyncStorageKey
> (key: Key) {
  const value: Ref<SyncStorageSchema[Key] | null> = ref(null)

  async function handler () {
    value.value = await getSyncStorage(key)
  }

  onMounted(handler)
  useChromeStorageListener(handler)

  watch(value, (value) => {
    if (value == null) return
    setSyncStorage(key, value)
  })

  return value
}
