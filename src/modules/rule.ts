import { type Pattern, parseRuleIntoPattern } from './pattern'
import { unique } from './unique'

export type RuleType = 'jobTitle' | 'companyName'
export type RuleSource = 'custom' | 'subscription'

export function normalizeRulesString (rules: string) {
  return unique(
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
  return unique(
    rules
      .split(separator)
      .map((rule) => rule.trim())
      .filter(Boolean)
  )
}
