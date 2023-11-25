import { isMatch } from 'matcher'

export function match (input: string, pattern: string) {
  return isMatch(input.trim(), pattern.trim(), { caseSensitive: false })
}
