import { unique } from '../../../modules/unique'

export type RuleType = 'jobTitle' | 'companyName'

export function normalizeRulesString (rules: string) {
  return unique(
    rules.split('\n')
      .map((rule) => rule.trim())
      .filter(Boolean)
  ).join('\n')
}

export function checkHasIllogicalRule (rules: string) {
  return rules.split('\n')
    .map((rule) => rule.trim())
    .some(rule => rule === '*' || rule === '**')
}
