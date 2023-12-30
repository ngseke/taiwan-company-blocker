import { onMounted, onUnmounted } from 'vue'
import { type StorageKey } from '../modules/storage'

type Handler = Parameters<typeof chrome.storage.onChanged.addListener>[0]

export function useChromeStorageListener (
  handler: Handler,
  key?: StorageKey
) {
  const changeHandler: Handler = (changes, ...rest) => {
    if (!key || key in changes) {
      handler(changes, ...rest)
    }
  }

  onMounted(() => { chrome.storage.onChanged.addListener(changeHandler) })
  onUnmounted(() => { chrome.storage.onChanged.removeListener(changeHandler) })
}
