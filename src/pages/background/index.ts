import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../modules/constants'
import { setupUpdateSubscriptionResultAlarm } from './modules/setupUpdateSubscriptionResultAlarm'

chrome.runtime.onMessage.addListener((message) => {
  if (message === OPEN_OPTIONS_PAGE_MESSAGE_NAME) {
    chrome.runtime.openOptionsPage()
  }
})

setupUpdateSubscriptionResultAlarm()
