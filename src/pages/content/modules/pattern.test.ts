import { describe, expect, test } from 'vitest'
import { isRegexpLiteral, match, parsePattern } from './pattern'

describe('pattern.ts', () => {
  test('isRegexpLiteral', () => {
    expect(isRegexpLiteral('/abc/')).toBe(true)
    expect(isRegexpLiteral('/123/')).toBe(true)
    expect(isRegexpLiteral('/ pattern(.+?)/i')).toBe(true)
    expect(isRegexpLiteral('/pattern/g')).toBe(true)
    expect(isRegexpLiteral('/pattern/m')).toBe(true)
    expect(isRegexpLiteral('/pattern/ig')).toBe(true)
    expect(isRegexpLiteral('/pattern/mig')).toBe(true)
    expect(isRegexpLiteral('/pattern/gim')).toBe(true)

    expect(isRegexpLiteral('')).toBe(false)
    expect(isRegexpLiteral(' ')).toBe(false)
    expect(isRegexpLiteral('//')).toBe(false)
    expect(isRegexpLiteral('z')).toBe(false)
    expect(isRegexpLiteral('\\s')).toBe(false)
    expect(isRegexpLiteral('pattern/mig')).toBe(false)
    expect(isRegexpLiteral('/pattern')).toBe(false)
    expect(isRegexpLiteral('//pattern')).toBe(false)
    expect(isRegexpLiteral('pattern//')).toBe(false)
  })

  test('parsePattern', () => {
    expect(parsePattern(' /pattern(.+?)/ '))
      .toEqual({ type: 'regex', value: /pattern(.+?)/ })
    expect(parsePattern(' /pat/ tern/ '))
      .toEqual({ type: 'regex', value: /pat\/ tern/ })
    expect(parsePattern('/(內|外)場/'))
      .toEqual({ type: 'regex', value: /(內|外)場/ })
    expect(parsePattern('/xyz/i'))
      .toEqual({ type: 'regex', value: /xyz/i })
    expect(parsePattern('/abc/img  '))
      .toEqual({ type: 'regex', value: /abc/img })

    expect(parsePattern('//'))
      .toEqual({ type: 'string', value: '//' })
    expect(parsePattern('**'))
      .toEqual({ type: 'string', value: '**' })
    expect(parsePattern(''))
      .toEqual({ type: 'string', value: '' })
    expect(parsePattern('  *海外*實習*'))
      .toEqual({ type: 'string', value: '*海外*實習*' })
    expect(parsePattern('*打字員  '))
      .toEqual({ type: 'string', value: '*打字員' })
    expect(parsePattern(' 產品行銷專員 '))
      .toEqual({ type: 'string', value: '產品行銷專員' })
    expect(parsePattern('\\\\\\'))
      .toEqual({ type: 'string', value: '\\\\\\' })
  })

  test('match', () => {
    expect(match('', '')).toEqual(false)
    expect(match('  ', '  ')).toEqual(false)
    expect(match('abc', '')).toEqual(false)
    expect(match('', 'abc')).toEqual(false)

    expect(match('\n  去除頭尾空格一字不差  ', ' 去除頭尾空格一字不差 \n')).toEqual(true)
    expect(match('CaSe~@#$%^&()_+{}[]<>,.InSeNsItIvE', 'case~@#$%^&()_+{}[]<>,.insensitive')).toEqual(true)
    expect(match('電子商務專案助理  ', ' *專案助理* ')).toEqual(true)
    expect(match('  電子商務專案助理', ' *專案助理 ')).toEqual(true)
    expect(match('電子商務專案助理', ' 電子商務* ')).toEqual(true)
    expect(match('柬埔寨海外高薪實習', '*海外*實習*')).toEqual(true)

    expect(match('IG小編｜社群行銷企劃', '社群')).toEqual(false)
    expect(match('IG小編｜社群行銷企劃', '社群*')).toEqual(false)
    expect(match('IG小編｜社群行銷企劃', '*社群')).toEqual(false)
    expect(match('Social Media Marketing Specialist', '*Social Media')).toEqual(false)

    expect(match('back-end', '/back(-?)END/i')).toEqual(true)
    expect(match('BaCk-eNd', '/back(-?)END/i')).toEqual(true)
    expect(match('back-end', '/BACK(-?)end/')).toEqual(false)

    expect(match('內場正職人員', '/(內|外)場/')).toEqual(true)
    expect(match('外場服務生', '/(內|外)場/')).toEqual(true)
    expect(match('中場休息', '/(內|外)場/')).toEqual(false)

    expect(match('中文中文', '/^[\u4e00-\u9fff]+$/')).toEqual(true)
    expect(match('a中文b混合c', '/^[\u4e00-\u9fff]+$/')).toEqual(false)
  })
})