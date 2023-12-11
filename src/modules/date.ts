import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import zhTw from 'dayjs/locale/zh-tw'

dayjs.extend(relativeTime)
dayjs.locale(zhTw)

export function formatRelativeTime (timestamp?: number, now?: dayjs.ConfigType) {
  if (!timestamp) return null
  return dayjs(timestamp).from(now ?? new Date())
}
