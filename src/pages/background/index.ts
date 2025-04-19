import { OPEN_OPTIONS_PAGE_MESSAGE_NAME, UPDATE_ICON_MESSAGE_NAME } from '../../modules/constants'
import { setupUpdateDatabaseAlarm } from './modules/setupUpdateDatabaseAlarm'
import { setupUpdateSubscriptionResultAlarm } from './modules/setupUpdateSubscriptionResultAlarm'

chrome.runtime.onMessage.addListener((message) => {
  if (message === OPEN_OPTIONS_PAGE_MESSAGE_NAME) {
    chrome.runtime.openOptionsPage()
  }
})

chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.action !== UPDATE_ICON_MESSAGE_NAME) return
  const { isEnabled, blockedCount } = message

  chrome.action.setIcon({
    path: isEnabled ? 'images/icon.png' : 'images/icon-disabled.png',
  })

  if (sender.tab) {
    chrome.action.setBadgeText({
      tabId: sender.tab?.id,
      text: (() => {
        if (!isEnabled || !blockedCount) return ''
        return blockedCount > 100 ? '99+' : String(blockedCount)
      })(),
    })
  }
})

setupUpdateSubscriptionResultAlarm()
setupUpdateDatabaseAlarm()
