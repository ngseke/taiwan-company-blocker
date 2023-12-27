import { appendRule, removeRule, replaceRule } from './ruleStorageAction'
import * as storage from './storage'

describe('ruleStorageAction', () => {
  vi.spyOn(storage, 'loadRules')
    .mockResolvedValue('abc\n123\nefg')
  const spySaveRules = vi.spyOn(storage, 'saveRules').mockResolvedValue()

  const type = 'companyName'

  test('removeRule', async () => {
    await removeRule(type, 'xyz')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nefg')
    await removeRule(type, '123')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\nefg')
  })

  test('replaceRule', async () => {
    await replaceRule(type, 'xyz', 'new value')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nefg')
    await replaceRule(type, '123', 'new value')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\nnew value\nefg')
  })

  test('appendRule', async () => {
    await appendRule(type, '456')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nefg\n456')
  })
})
