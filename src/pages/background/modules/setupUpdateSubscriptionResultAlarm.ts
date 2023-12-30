import { updateSubscriptionResult } from '../../../modules/Subscription'

export const UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME = 'updateSubscriptionResultAlarmName'

export async function setupUpdateSubscriptionResultAlarm () {
  chrome.alarms.onAlarm.addListener(({ name }) => {
    if (name === UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME) {
      updateSubscriptionResult()
    }
  })

  const ONE_DAY_IN_MINUTES = 60 * 24

  const existedAlarm = await chrome.alarms.get(UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME)

  if (!existedAlarm) {
    chrome.alarms.create(
      UPDATE_SUBSCRIPTION_RESULT_ALARM_NAME,
      { periodInMinutes: ONE_DAY_IN_MINUTES }
    )
  }
}
