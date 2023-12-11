import RegexParser from 'regex-parser'

export function isRegexpLiteral (maybeRegexpLiteral: string) {
  if (maybeRegexpLiteral === '//') return false

  const isFormatValid = /^\/.*\/(?:([gim])(?!.*\1)){0,3}$/.test(maybeRegexpLiteral)
  try {
    const regex = new RegExp(maybeRegexpLiteral)
    return isFormatValid && Boolean(regex)
  } catch (e) {
    return false
  }
}

interface RegexPattern { type: 'regex', value: RegExp, rawValue: string }
interface StringPattern { type: 'string', value: string, rawValue: string }

type Pattern = RegexPattern | StringPattern

const patternCache = new Map<string, Pattern>()

export function parseRuleIntoPattern (rule: string): Pattern {
  rule = rule.trim()

  if (patternCache.has(rule)) {
    return patternCache.get(rule) as Pattern
  }

  if (isRegexpLiteral(rule)) {
    try {
      const regex = RegexParser(rule)
      const result = { type: 'regex', value: regex, rawValue: rule } as const
      patternCache.set(rule, result)

      return result
    } catch (err) {}
  }
  const pattern = { type: 'string', value: rule, rawValue: rule } as const
  patternCache.set(rule, pattern)

  return pattern
}

function matchStringPatterns (input: string, patterns: string[]): boolean {
  input = input.trim().toLowerCase()

  for (let pattern of patterns) {
    pattern = pattern.trim().toLowerCase()
    if (pattern === input) return true

    const startsWithWildcard = pattern.startsWith('*')
    const endsWithWildcard = pattern.endsWith('*')
    const trimmedPattern = pattern.slice(
      startsWithWildcard ? 1 : 0,
      endsWithWildcard ? -1 : undefined
    )

    if (startsWithWildcard && endsWithWildcard) {
      if (input.includes(trimmedPattern)) return true
    } else if (startsWithWildcard) {
      if (input.endsWith(trimmedPattern)) return true
    } else if (endsWithWildcard) {
      if (input.startsWith(trimmedPattern)) return true
    }
  }

  return false
}

export function match (input: string, ruleOrRules: string | string[]) {
  input = input.trim()
  if (!input) return false

  const rules = Array.isArray(ruleOrRules) ? ruleOrRules : [ruleOrRules]

  const patterns = rules.map(parseRuleIntoPattern)

  const stringPatterns = patterns
    .filter((pattern): pattern is StringPattern => pattern?.type === 'string')
    .map(({ value }) => value)

  const regexPatterns = patterns
    .filter((pattern): pattern is RegexPattern => pattern?.type === 'regex')
    .map(({ value }) => value)

  const isMatchedStringPatterns = matchStringPatterns(
    input,
    stringPatterns ?? [],
  )
  const isMatchedRegexpPatterns = regexPatterns
    .some((regex) => regex.test(input))

  return isMatchedStringPatterns || isMatchedRegexpPatterns
}

export function matchDetail (input: string, rules: string[]) {
  input = input.trim()
  if (!input) return []

  const patterns = rules.map(parseRuleIntoPattern)

  return patterns
    .filter((pattern) => {
      if (pattern.type === 'string') {
        return matchStringPatterns(input, [pattern.value])
      } else if (pattern.type === 'regex') {
        return pattern.value.test(input)
      }
      return false
    })
    .map((pattern) => ({
      pattern: pattern.rawValue,
      input,
    }))
}
