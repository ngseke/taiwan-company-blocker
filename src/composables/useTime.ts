import { useNow } from '@vueuse/core'
import { formatRelativeTime, formatTime } from '../modules/date'

export function useTime () {
  const now = useNow({ interval: 1000 })

  function getRelativeTime (timestamp?: number) {
    if (!timestamp) return
    return formatRelativeTime(timestamp, now.value)
  }

  function getFormattedTime (timestamp?: number) {
    if (!timestamp) return
    return formatTime(timestamp)
  }

  return {
    getRelativeTime,
    getFormattedTime,
  }
}
