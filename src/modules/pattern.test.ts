import { isRegexpLiteral, match, parseRawIntoGroups, parseRuleIntoPattern } from './pattern'

describe('pattern.ts', () => {
  test('parseRule', () => {
    expect(parseRawIntoGroups('  /regex.*/  ## comment'))
      .toMatchObject({
        leadingSpace: '  ',
        pattern: 'regex.*',
        regex: '/regex.*/',
        spaceAfterRule: '  ',
        comment: '## comment',
      })
    expect(parseRawIntoGroups('  /regex-with-flags/iu  ## comment'))
      .toMatchObject({
        leadingSpace: '  ',
        pattern: 'regex-with-flags',
        regex: '/regex-with-flags/iu',
        flags: 'iu',
        spaceAfterRule: '  ',
        comment: '## comment',
      })
    expect(parseRawIntoGroups('  string  #  comment#with space '))
      .toMatchObject({
        leadingSpace: '  ',
        wildcard: 'string',
        spaceAfterRule: '  ',
        comment: '#  comment#with space ',
      })
    expect(parseRawIntoGroups('\\a中文b 字串c# 中文#註解  '))
      .toMatchObject({
        leadingSpace: '',
        wildcard: '\\a中文b 字串c',
        spaceAfterRule: '',
        comment: '# 中文#註解  ',
      })
    expect(parseRawIntoGroups('# only comment'))
      .toMatchObject({
        comment: '# only comment',
        wildcard: '',
      })
  })

  test('isRegexpLiteral', () => {
    expect(isRegexpLiteral('/abc/')).toBe(true)
    expect(isRegexpLiteral('/123/')).toBe(true)
    expect(isRegexpLiteral('/ pattern(.+?)/i')).toBe(true)
    expect(isRegexpLiteral('/pattern/i')).toBe(true)
    expect(isRegexpLiteral('/pattern/u')).toBe(true)
    expect(isRegexpLiteral('/pattern/iu')).toBe(true)
    expect(isRegexpLiteral('/pattern/ui')).toBe(true)

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
    expect(parseRuleIntoPattern(' /pattern(.+?)/ '))
      .toMatchObject({ type: 'regex' })
    expect(parseRuleIntoPattern(' /pat/ tern/ '))
      .toMatchObject({ type: 'regex' })
    expect(parseRuleIntoPattern('/(內|外)場/'))
      .toMatchObject({ type: 'regex' })
    expect(parseRuleIntoPattern('/xyz/i'))
      .toMatchObject({ type: 'regex' })
    expect(parseRuleIntoPattern('/abc/ui  '))
      .toMatchObject({ type: 'regex' })

    expect(parseRuleIntoPattern('//'))
      .toMatchObject({ type: 'string', value: '//' })
    expect(parseRuleIntoPattern('**'))
      .toMatchObject({ type: 'string', value: '**' })
    expect(parseRuleIntoPattern(''))
      .toMatchObject({ type: 'string', value: '' })
    expect(parseRuleIntoPattern('*打字員  '))
      .toMatchObject({ type: 'string', value: '*打字員' })
    expect(parseRuleIntoPattern(' 產品行銷專員 '))
      .toMatchObject({ type: 'string', value: '產品行銷專員' })
    expect(parseRuleIntoPattern('\\\\\\'))
      .toMatchObject({ type: 'string', value: '\\\\\\' })
  })

  test('match', () => {
    expect(match('', '')).toEqual(false)
    expect(match('  ', '  ')).toEqual(false)
    expect(match('abc', '')).toEqual(false)
    expect(match('', 'abc')).toEqual(false)
    expect(match('', '*')).toEqual(false)
    expect(match('', '**')).toEqual(false)

    expect(match('\n  去除頭尾空格一字不差  ', ' 去除頭尾空格一字不差 \n')).toEqual(true)
    expect(match('CaSe~@$%^&()_+{}[]<>,.InSeNsItIvE', 'case~@$%^&()_+{}[]<>,.insensitive')).toEqual(true)
    expect(match('電子商務專案助理  ', ' *專案助理* ')).toEqual(true)
    expect(match('  電子商務專案助理', ' *專案助理 ')).toEqual(true)
    expect(match('電子商務專案助理', ' 電子商務* ')).toEqual(true)
    expect(match('柬埔寨海外高薪實習', '*海外*實習*')).toEqual(false)

    expect(match('IG小編｜社群行銷企劃', '社群')).toEqual(false)
    expect(match('IG小編｜社群行銷企劃', '社群*')).toEqual(false)
    expect(match('IG小編｜社群行銷企劃', '*社群')).toEqual(false)
    expect(match('Social Media Marketing Specialist', '*Social Media')).toEqual(false)

    expect(match('back-end  ', '/back(-?)END/i')).toEqual(true)
    expect(match('  BaCk-eNd', '/back(-?)END/i')).toEqual(true)
    expect(match('  BaCk-eNd', '/BaCk-eNd/')).toEqual(true)
    expect(match(' back-end ', '/BACK(-?)end/')).toEqual(false)

    expect(match('內場正職人員', '/(內|外)場/')).toEqual(true)
    expect(match('外場服務生', '/(內|外)場/')).toEqual(true)
    expect(match('中場休息', '/(內|外)場/')).toEqual(false)

    expect(match('中文中文', '/^[\u4e00-\u9fff]+$/')).toEqual(true)
    expect(match('a中文b混合c', '/^[\u4e00-\u9fff]+$/')).toEqual(false)
  })
})
