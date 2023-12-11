import { type SubscriptionResultSuccess } from './Subscription'
import { parseRulesString } from './rule'
import { loadRules, loadSubscriptionResults } from './storage'

export async function loadParsedRules () {
  const storageCompanyNameRules = parseRulesString(await loadRules('companyName'))
  const storageJobTitleRules = parseRulesString(await loadRules('jobTitle'))

  const subscriptionResults = await loadSubscriptionResults()
  const subscriptionRules = Object.values(subscriptionResults)
    .filter((result): result is SubscriptionResultSuccess => (
      result.status === 'success'
    ))
    .map((result) => parseRulesString(result.rules))
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
