import { onMounted, onUnmounted } from 'vue'

export function useChromeStorageListener (
  handler: Parameters<typeof chrome.storage.onChanged.addListener>[0]
) {
  onMounted(async () => {
    chrome.storage.onChanged.addListener(handler)
  })

  onUnmounted(() => {
    chrome.storage.onChanged.removeListener(handler)
  })
}
