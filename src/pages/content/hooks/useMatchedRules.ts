import { COMPANY_NAME_RULES_STORAGE_KEY, JOB_TITLE_RULES_STORAGE_KEY, SUBSCRIPTION_RESULTS_KEY } from '../../../modules/storage'
import { type SubscriptionResultSuccess } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'
import { type RuleSource, type RuleType, convertRulesStringToArray } from '../../../modules/rule'
import { getMatchedRules } from '../../../modules/pattern'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { useMemo } from 'react'

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
}: Record<'jobTitle' | 'companyName', Nullish<string>>) {
  const [companyNameRules] = useChromeStorage(COMPANY_NAME_RULES_STORAGE_KEY)
  const [jobTitleRules] = useChromeStorage(JOB_TITLE_RULES_STORAGE_KEY)
  const [subscriptionResults] = useChromeStorage(SUBSCRIPTION_RESULTS_KEY)

  const companyNameMatchedRules = useMemo(() => {
    const input = companyName
    if (!input) return []
    return [
      ...Object.values(subscriptionResults ?? {})
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
      ...getMatchedRulesWithMeta(input, companyNameRules ?? '', {
        groupName: '公司',
        ruleType: 'companyName',
        ruleSource: 'custom',
      }),
    ]
  }, [companyName, companyNameRules, subscriptionResults])

  const jobTitleMatchedRules = useMemo(() => {
    const input = jobTitle
    if (!input) return []
    return getMatchedRulesWithMeta(input, jobTitleRules ?? '', {
      groupName: '職缺',
      ruleType: 'jobTitle',
      ruleSource: 'custom',
    })
  }, [jobTitle, jobTitleRules])

  const matchedRules = useMemo(() => ([
    ...companyNameMatchedRules,
    ...jobTitleMatchedRules,
  ]), [companyNameMatchedRules, jobTitleMatchedRules])

  return {
    companyNameMatchedRules,
    jobTitleMatchedRules,
    matchedRules,
  }
}
