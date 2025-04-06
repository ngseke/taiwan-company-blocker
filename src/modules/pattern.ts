import { type Nullish } from '../types/Nullish'

export function isRegexpLiteral (maybeRegexpLiteral: string) {
  if (maybeRegexpLiteral === '//') return false

  const isFormatValid = /^\/.*\/(?:([iu])(?!.*\1)){0,2}$/.test(maybeRegexpLiteral)
  try {
    const regex = new RegExp(maybeRegexpLiteral)
    return isFormatValid && Boolean(regex)
  } catch (e) {
    return false
  }
}

interface BasePattern {
  raw: string
  comment: string | null
}

type RegexPattern = BasePattern & {
  type: 'regex'
  value: RegExp
}

type StringPattern = BasePattern & {
  type: 'string'
  value: string
}

export type Pattern = RegexPattern | StringPattern

interface Groups {
  leadingSpace: string
  regex: string
  pattern: string
  flags: string
  wildcard: string
  spaceAfterRule: string
  comment: string
}

export function parseRawIntoGroups (input: string): Groups | null {
  const leadingSpace = '(?<leadingSpace>\\s*)'

  const flags = '(?<flags>iu?|ui?)'
  const pattern = '(?<pattern>.+)'
  const regex = `(?<regex>/${pattern}/${flags}?)`
  const wildcard = '(?<wildcard>.*?)'
  const rule = `(?:${regex}|${wildcard})`

  const spaceAfterRule = '(?<spaceAfterRule>\\s*)'

  const comment = '(?<comment>#.*)'

  const onlyCommentInstance = new RegExp(`^${leadingSpace}?${comment}$`)
  const instance = new RegExp(`^${leadingSpace}?(?:${rule}${spaceAfterRule}?)?${comment}?$`)

  const { groups } = onlyCommentInstance.exec(input) ?? instance.exec(input) ?? {}
  if (!groups) return null

  return {
    leadingSpace: groups?.leadingSpace ?? '',
    regex: groups?.regex ?? '',
    pattern: groups?.pattern ?? '',
    flags: groups?.flags ?? '',
    wildcard: groups?.wildcard ?? '',
    spaceAfterRule: groups?.spaceAfterRule ?? '',
    comment: groups?.comment ?? '',
  }
}

const patternCache = new Map<string, Pattern>()

export function parseRuleIntoPattern (raw: string): Pattern | null {
  if (patternCache.has(raw)) {
    return patternCache.get(raw) as Pattern
  }

  const groups = parseRawIntoGroups(raw)
  if (!groups) return null

  const { comment, pattern, flags, wildcard } = groups

  const baseResult = { raw, comment }

  if (pattern) {
    try {
      const value = new RegExp(pattern, flags)
      const result = { ...baseResult, type: 'regex', value } as const
      patternCache.set(raw, result)

      return result
    } catch (err) {
      return null
    }
  }

  const result = { ...baseResult, type: 'string', value: wildcard } as const
  patternCache.set(raw, result)

  return result
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

export function match (input: Nullish<string>, ruleOrRules: string | string[]) {
  input = input?.trim()
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
    .some((regex) => regex.test(input as string))

  return isMatchedStringPatterns || isMatchedRegexpPatterns
}

export type MatchedRule = Pattern & {
  input: string
}

export function getMatchedRules (input: string, rules: string[]) {
  input = input.trim()
  if (!input) return []

  const patterns = rules.map(parseRuleIntoPattern)

  return patterns
    .filter((pattern): pattern is Pattern => Boolean(pattern))
    .filter((pattern) => {
      if (pattern.type === 'string') {
        return matchStringPatterns(input, [pattern.value])
      } else if (pattern.type === 'regex') {
        return pattern.value.test(input)
      }
      return false
    })
    .map<MatchedRule>((pattern) => ({ ...pattern, input }))
}
