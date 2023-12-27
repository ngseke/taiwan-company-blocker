import { computed, unref, type Ref } from 'vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { COMPANY_NAME_RULES_STORAGE_KEY, JOB_TITLE_RULES_STORAGE_KEY, SUBSCRIPTION_RESULTS_KEY } from '../../../modules/storage'
import { type SubscriptionResultSuccess } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'
import { type RuleSource, type RuleType, convertRulesStringToArray } from '../../../modules/rule'
import { getMatchedRules } from '../../../modules/pattern'

function getMatchedRulesWithMeta (
  input: string,
  rules: string,
  meta: {
    ruleType: RuleType
    ruleSource: RuleSource
    groupName: string
  }
) {
  return getMatchedRules(input, convertRulesStringToArray(rules))
    .map((matchedRule) => ({
      ...matchedRule,
      ...meta,
    }))
}

export type MatchedRulesWithMeta = ReturnType<typeof getMatchedRulesWithMeta>

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
          getMatchedRulesWithMeta(input, result.rules, {
            groupName: `[訂閱] ${result.name}`,
            ruleType: 'companyName',
            ruleSource: 'subscription',
          })
        ))
        .flat(1),
      ...getMatchedRulesWithMeta(input, companyNameRules.value ?? '', {
        groupName: '公司名稱',
        ruleType: 'companyName',
        ruleSource: 'custom',
      }),
    ]
  })

  const jobTitleMatchedRules = computed(() => {
    const input = unref(jobTitle)
    if (!input) return []
    return getMatchedRulesWithMeta(input, jobTitleRules.value ?? '', {
      groupName: '職缺名稱',
      ruleType: 'jobTitle',
      ruleSource: 'custom',
    })
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
