import { getMatchedRules } from './pattern'
import { unique } from './unique'

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
    .some((rule) => rule === '*' || rule === '**')
}

export function parseRulesString (rules: string) {
  const separator = '\n'
  return unique(
    rules
      .split(separator)
      .map((rule) => rule.trim())
      .filter(Boolean)
  )
}

export function getMatchedRulesWithGroupName (
  input: string, groupName: string, rules: string
) {
  return getMatchedRules(input, parseRulesString(rules))
    .map((item) => ({ ...item, groupName }))
}
