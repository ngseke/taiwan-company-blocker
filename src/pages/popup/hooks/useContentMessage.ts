import { QUERY_PLATFORM_NAME_MESSAGE_NAME, QUERY_BLOCKED_COUNT_MESSAGE_NAME } from '../../../modules/constants'
import { sendMessageToCurrentTab } from '../modules/chrome'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import { type PlatformName } from '../../../../schemas/platformName'
import { useCallback, useEffect, useState } from 'react'

export function useContentMessage () {
  const [platformName, setPlatformName] = useState<PlatformName | null>(null)
  const [blockedCount, setBlockedCount] = useState<number | null>(null)

  const query = useCallback(() => {
    ;(async function queryPlatformName () {
      setPlatformName(
        await sendMessageToCurrentTab(QUERY_PLATFORM_NAME_MESSAGE_NAME) as PlatformName
      )
    })()
    ;(async function queryBlockedCount () {
      setBlockedCount(
        await sendMessageToCurrentTab(QUERY_BLOCKED_COUNT_MESSAGE_NAME) as number
      )
    })()
  }, [])

  const [isEnabled] = useChromeStorage(ENABLED_STORAGE_KEY)

  query()

  useEffect(() => {
    ;(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (isEnabled) {
        query()
      } else {
        setBlockedCount(null)
      }
    })()
  }, [isEnabled, query])

  return {
    platformName,
    blockedCount,
  }
}
