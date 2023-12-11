import { computed, unref, type Ref } from 'vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { COMPANY_NAME_RULES_STORAGE_KEY, JOB_TITLE_RULES_STORAGE_KEY, SUBSCRIPTION_RESULTS_KEY } from '../../../modules/storage'
import { type SubscriptionResultSuccess } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'
import { getMatchedRulesWithGroupName } from '../../../modules/rule'

export function useMatchedRules ({
  jobTitle,
  companyName,
}: Record<'jobTitle' | 'companyName', Ref<Nullish<string>>>) {
  const companyNameRules = useChromeStorage(COMPANY_NAME_RULES_STORAGE_KEY)
  const jobTitleRules = useChromeStorage(JOB_TITLE_RULES_STORAGE_KEY)
  const subscriptionResults = useChromeStorage(SUBSCRIPTION_RESULTS_KEY)

  const companyNameMatchedRules = computed(() => {
    const input = unref(companyName)
    if (!input) return []
    return [
      ...Object.values(subscriptionResults.value ?? {})
        .filter((result): result is SubscriptionResultSuccess => (
          result.status === 'success'
        ))
        .map((result) => (
          getMatchedRulesWithGroupName(input, `訂閱-${result.name}`, result.rules)
        ))
        .flat(1),
      ...getMatchedRulesWithGroupName(input, '公司名稱', companyNameRules.value ?? ''),
    ]
  })

  const jobTitleMatchedRules = computed(() => {
    const input = unref(jobTitle)
    if (!input) return []
    return getMatchedRulesWithGroupName(input, '職缺名稱', jobTitleRules.value ?? '')
  })

  const matchedRules = computed(() => ([
    ...companyNameMatchedRules.value,
    ...jobTitleMatchedRules.value,
  ]))

  return {
    companyNameMatchedRules,
    jobTitleMatchedRules,
    matchedRules,
  }
}
