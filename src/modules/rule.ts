import { uniq } from 'lodash-es'
import { type Pattern, parseRuleIntoPattern } from './pattern'

export type RuleType = 'jobTitle' | 'companyName'
export type RuleSource = 'custom' | 'subscription'

export function normalizeRulesString (rules: string) {
  return uniq(
    rules.split('\n')
      .map((rule) => rule.trim())
      .filter(Boolean)
  ).join('\n')
}

export function checkHasIllogicalRule (rules: string) {
  return rules.split('\n')
    .map((rule) => parseRuleIntoPattern(rule.trim()))
    .filter((pattern): pattern is Pattern => Boolean(pattern))
    .some(({ value }) => value === '*' || value === '**')
}

export function convertRulesStringToArray (rules: string) {
  const separator = '\n'
  return uniq(
    rules
      .split(separator)
      .map((rule) => rule.trim())
      .filter(Boolean)
  )
}
