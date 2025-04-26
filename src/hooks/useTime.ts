import { formatRelativeTime, formatTime } from '../modules/date'
import { useNow } from './useNow'

export function useTime () {
  const now = useNow(1000)

  function getRelativeTime (timestamp?: number) {
    if (!timestamp) return
    return formatRelativeTime(timestamp, now)
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
