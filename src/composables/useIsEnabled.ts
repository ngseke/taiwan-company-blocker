import { onMounted, ref, watch } from 'vue'
import { loadIsEnabled, saveIsEnabled } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'

export function useIsEnabled () {
  const isEnabled = ref<boolean | null>(null)

  async function handler () {
    isEnabled.value = await loadIsEnabled()
  }

  onMounted(handler)
  useChromeStorageListener(handler)

  watch(isEnabled, (isEnabled) => {
    if (isEnabled == null) return
    saveIsEnabled(isEnabled)
  })

  return {
    isEnabled,
  }
}
