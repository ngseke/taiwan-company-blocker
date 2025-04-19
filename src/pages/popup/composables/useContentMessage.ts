import { ref, watch } from 'vue'
import { QUERY_PLATFORM_NAME_MESSAGE_NAME, QUERY_BLOCKED_COUNT_MESSAGE_NAME } from '../../../modules/constants'
import { sendMessageToCurrentTab } from '../modules/chrome'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import { type PlatformName } from '../../../schemas/platformName'

export function useContentMessage () {
  async function queryPlatformName () {
    platformName.value =
      await sendMessageToCurrentTab(QUERY_PLATFORM_NAME_MESSAGE_NAME) as any
  }
  const platformName = ref<PlatformName | null>(null)

  async function queryBlockedCount () {
    blockedCount.value =
      await sendMessageToCurrentTab(QUERY_BLOCKED_COUNT_MESSAGE_NAME) as any
  }
  const blockedCount = ref<number | null>(null)

  function query () {
    queryPlatformName()
    queryBlockedCount()
  }

  const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)

  query()

  watch(isEnabled, async (isEnabled) => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (isEnabled) {
      query()
    } else {
      blockedCount.value = null
    }
  })

  return {
    platformName,
    blockedCount,
  }
}
