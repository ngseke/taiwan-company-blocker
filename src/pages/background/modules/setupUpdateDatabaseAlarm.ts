import { updateDatabase } from '../../../modules/database'

export const UPDATE_DATABASE_RESULT_ALARM_NAME = 'updateDatabaseResultAlarmName'

export async function setupUpdateDatabaseAlarm () {
  chrome.alarms.onAlarm.addListener(({ name }) => {
    if (name === UPDATE_DATABASE_RESULT_ALARM_NAME) {
      updateDatabase()
    }
  })

  const ONE_DAY_IN_MINUTES = 60 * 24

  const existedAlarm = await chrome.alarms.get(UPDATE_DATABASE_RESULT_ALARM_NAME)

  if (!existedAlarm) {
    updateDatabase()

    chrome.alarms.create(
      UPDATE_DATABASE_RESULT_ALARM_NAME,
      { periodInMinutes: ONE_DAY_IN_MINUTES }
    )
  }
}
