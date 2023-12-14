import { checkHasIllogicalRule, convertRulesStringToArray } from './rule'

describe('rule', () => {
  test('checkHasIllogicalRule', () => {
    expect(checkHasIllogicalRule('')).toBe(false)
    expect(checkHasIllogicalRule('abc')).toBe(false)
    expect(checkHasIllogicalRule('1*')).toBe(false)
    expect(checkHasIllogicalRule('1**')).toBe(false)
    expect(checkHasIllogicalRule('/**/')).toBe(false)

    expect(checkHasIllogicalRule('*#')).toBe(true)
    expect(checkHasIllogicalRule(' * #comment')).toBe(true)
    expect(checkHasIllogicalRule('**')).toBe(true)
    expect(checkHasIllogicalRule(' ** ')).toBe(true)
  })

  test('convertRulesStringToArray', () => {
    expect(convertRulesStringToArray(''))
      .toMatchObject([])
    expect(convertRulesStringToArray(' \n   a   \n\n\n/b/\n c# c '))
      .toMatchObject(['a', '/b/', 'c# c'])
  })
})
