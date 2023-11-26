import { isMatch } from 'matcher'
import { type Nullish } from '../../../types/Nullish'
import { type PlatformName } from './platform'

export function match (input: string, pattern: string) {
  return isMatch(input.trim(), pattern.trim(), { caseSensitive: false })
}

export type PatternType = 'jobTitle' | 'companyName'

export interface Pattern {
  pattern: string
  platform?: Nullish<PlatformName[]>
}
