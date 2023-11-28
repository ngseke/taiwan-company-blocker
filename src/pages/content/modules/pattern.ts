import { isMatch } from 'matcher'
import { type Nullish } from '../../../types/Nullish'
import { type PlatformName } from './platform'
import { groupBy } from 'lodash-es'
import RegexParser from 'regex-parser'

function isRegexpLiteral (maybeRegexpLiteral: string) {
  const isFormatValid = /^\/.*\/$/.test(maybeRegexpLiteral)
  try {
    const regex = new RegExp(maybeRegexpLiteral)
    return isFormatValid && Boolean(regex)
  } catch (e) {
    return false
  }
}

export function match (input: string, pattern: string | string[]) {
  const patterns = Array.isArray(pattern)
    ? pattern.map(string => string.trim())
    : [pattern.trim()]

  const { regexpPatterns, stringPatterns } = groupBy(patterns, (pattern) => (
    isRegexpLiteral(pattern) ? 'regexpPatterns' : 'stringPatterns'
  ))

  const trimmedInput = input.trim()

  const isMatchedStringPatterns = isMatch(
    trimmedInput,
    stringPatterns ?? [],
    { caseSensitive: false }
  )
  const isMatchedRegexpPatterns = (regexpPatterns ?? [])
    .some((regexpLiteral) => {
      try {
        return RegexParser(regexpLiteral).test(trimmedInput)
      } catch (e) {
        return false
      }
    })

  return isMatchedStringPatterns || isMatchedRegexpPatterns
}

export type PatternType = 'jobTitle' | 'companyName'

export interface Pattern {
  pattern: string
  platform?: Nullish<PlatformName[]>
}
