import { updateSubscriptionResult } from '../../modules/Subscription'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME, UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME } from '../../modules/constants'

chrome.runtime.onMessage.addListener((message) => {
  if (message === OPEN_OPTIONS_PAGE_MESSAGE_NAME) {
    chrome.runtime.openOptionsPage()
  }
})

chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name === UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME) {
    updateSubscriptionResult()
  }
})

const ONE_DAY_IN_MINUTES = 60 * 24

chrome.alarms.create(
  UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME,
  { periodInMinutes: ONE_DAY_IN_MINUTES }
)
