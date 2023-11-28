import { isMatch } from 'matcher'
import { type Nullish } from '../../../types/Nullish'
import { type PlatformName } from './platform'

export function match (input: string, pattern: string | string[]) {
  const patterns = Array.isArray(pattern)
    ? pattern.map(string => string.trim())
    : pattern.trim()

  return isMatch(
    input.trim(),
    patterns,
    { caseSensitive: false }
  )
}

export type PatternType = 'jobTitle' | 'companyName'

export interface Pattern {
  pattern: string
  platform?: Nullish<PlatformName[]>
}
