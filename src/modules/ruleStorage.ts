import { type SubscriptionResultSuccess } from './Subscription'
import { loadRules, loadSubscriptionResults } from './storage'
import { unique } from './unique'

export async function loadParsedRules () {
  function parse (rules: string) {
    const separator = '\n'
    return unique(
      rules
        .split(separator)
        .map((rule) => rule.trim())
        .filter(Boolean)
    )
  }
  const storageCompanyNameRules = parse(await loadRules('companyName'))
  const storageJobTitleRules = parse(await loadRules('jobTitle'))

  const subscriptionResults = await loadSubscriptionResults()
  const subscriptionRules = Object.values(subscriptionResults)
    .filter((result): result is SubscriptionResultSuccess => (
      result.status === 'success'
    ))
    .map((result) => parse(result.rules))
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
