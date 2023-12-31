import { appendRule, removeRule, replaceRule } from './ruleStorageAction'
import * as storage from './storage'

describe('ruleStorageAction', () => {
  vi.spyOn(storage, 'loadRules')
    .mockResolvedValue('abc\n123\nxyz')
  const spySaveRules = vi.spyOn(storage, 'saveRules').mockResolvedValue()

  const type = 'companyName'

  test('removeRule', async () => {
    await removeRule(type, 'efg')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nxyz')
    await removeRule(type, '123')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\nxyz')
  })

  test('replaceRule', async () => {
    await replaceRule(type, 'efg', 'new value')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nxyz')
    await replaceRule(type, '123', 'new value')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\nnew value\nxyz')
  })

  test('appendRule', async () => {
    await appendRule(type, '456')
    expect(spySaveRules).toHaveBeenLastCalledWith(type, 'abc\n123\nxyz\n456')
  })
})
