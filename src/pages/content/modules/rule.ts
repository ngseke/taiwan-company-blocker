export type RuleType = 'jobTitle' | 'companyName'

export function normalizeRulesString (rules: string) {
  return [
    ...new Set(
      rules.split('\n')
        .map((rule) => rule.trim())
        .filter(Boolean)
    ),
  ].join('\n')
}
