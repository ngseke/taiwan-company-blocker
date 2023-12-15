import { StreamLanguage } from '@codemirror/language'
import { parseRawIntoGroups } from './pattern'

export const rulesLanguage = StreamLanguage.define<{
  tokens: Array<readonly [number, string | null]>
}>({
  token (stream, state) {
    if (stream.sol()) {
      const groups = parseRawIntoGroups(stream.string)
      if (!groups) {
        stream.skipToEnd()
        return 'invalid'
      }
      state.tokens = []

      if (groups.leadingSpace) {
        state.tokens.push([groups.leadingSpace.length, null])
      }

      if (groups.wildcard) {
        state.tokens.push([groups.wildcard.length, null])
      }
      if (groups.regex) {
        state.tokens.push([groups.regex.length, 'regexp'])
      }

      if (groups.spaceAfterRule) {
        state.tokens.push([groups.spaceAfterRule.length, null])
      }
      if (groups.comment) {
        state.tokens.push([groups.comment.length, 'lineComment'])
      }
    }

    const token = state.tokens.shift()

    if (!token) {
      stream.skipToEnd()
      return 'invalid'
    }
    stream.pos += token[0]

    return token[1]
  },
  startState () {
    return { tokens: [] }
  },
  copyState (state) {
    return { tokens: [...state.tokens] }
  },
})
