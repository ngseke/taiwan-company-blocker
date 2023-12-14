import { type SubscriptionResultSuccess } from './Subscription'
import { convertRulesStringToArray } from './rule'
import { loadRules, loadSubscriptionResults } from './storage'

export async function loadParsedRules () {
  const storageCompanyNameRules = convertRulesStringToArray(await loadRules('companyName'))
  const storageJobTitleRules = convertRulesStringToArray(await loadRules('jobTitle'))

  const subscriptionResults = await loadSubscriptionResults()
  const subscriptionRules = Object.values(subscriptionResults)
    .filter((result): result is SubscriptionResultSuccess => (
      result.status === 'success'
    ))
    .map((result) => convertRulesStringToArray(result.rules))
    .flat(1)

  const companyNameRules = [
    ...storageCompanyNameRules,
    ...subscriptionRules,
  ]

  return {
    companyNameRules,
    jobTitleRules: storageJobTitleRules,
  }
}
