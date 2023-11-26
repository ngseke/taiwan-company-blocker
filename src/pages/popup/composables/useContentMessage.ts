import { ref } from 'vue'
import { QUERY_PLATFORM_NAME_MESSAGE_NAME, QUERY_BLOCKED_COUNT_MESSAGE_NAME } from '../../../modules/constants'
import { type PlatformName } from '../../content/modules/platform'
import { sendMessageToCurrentTab } from '../modules/chrome'

export function useContentMessage () {
  async function queryPlatformName () {
    platformName.value =
      await sendMessageToCurrentTab(QUERY_PLATFORM_NAME_MESSAGE_NAME) as any
  }
  const platformName = ref<PlatformName | null>(null)
  queryPlatformName()

  async function queryBlockedCount () {
    blockedCount.value =
      await sendMessageToCurrentTab(QUERY_BLOCKED_COUNT_MESSAGE_NAME) as any
  }
  const blockedCount = ref<number | null>(null)
  queryBlockedCount()

  return {
    platformName,
    blockedCount,
  }
}
