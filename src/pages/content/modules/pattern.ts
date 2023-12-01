import { isMatch } from 'matcher'
import { type Nullish } from '../../../types/Nullish'
import { type PlatformName } from './platform'
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

interface ParsedRegexPattern { type: 'regex', value: RegExp }
interface ParsedStringPattern { type: 'string', value: string }

type ParsedPattern = ParsedRegexPattern | ParsedStringPattern

const parsePatternCache = new Map<string, ParsedPattern>()

export function parsePattern (value: string) {
  value = value.trim()

  if (parsePatternCache.has(value)) {
    return parsePatternCache.get(value)
  }

  if (isRegexpLiteral(value)) {
    try {
      const regex = RegexParser(value)
      const result = { type: 'regex', value: regex } as const
      parsePatternCache.set(value, result)

      return result
    } catch (err) {}
  }
  const result = { type: 'string', value } as const
  parsePatternCache.set(value, result)

  return result
}

export function match (input: string, pattern: string | string[]) {
  input = input.trim()
  if (!input) return false

  const patterns = Array.isArray(pattern) ? pattern : [pattern]

  const parsedPatterns = patterns.map(parsePattern)

  const parsedStringPatterns = parsedPatterns
    .filter((pattern): pattern is ParsedStringPattern => pattern?.type === 'string')
    .map(({ value }) => value)

  const parsedRegexPatterns = parsedPatterns
    .filter((pattern): pattern is ParsedRegexPattern => pattern?.type === 'regex')
    .map(({ value }) => value)

  const trimmedInput = input.trim()

  const isMatchedStringPatterns = isMatch(
    trimmedInput,
    parsedStringPatterns ?? [],
    { caseSensitive: false }
  )
  const isMatchedRegexpPatterns = parsedRegexPatterns
    .some((regex) => regex.test(trimmedInput))

  return isMatchedStringPatterns || isMatchedRegexpPatterns
}

export type PatternType = 'jobTitle' | 'companyName'

export interface Pattern {
  pattern: string
  platform?: Nullish<PlatformName[]>
}
