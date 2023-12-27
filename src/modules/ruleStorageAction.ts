import { type RuleType, convertRulesStringToArray } from './rule'
import { loadRules, saveRules } from './storage'

export async function removeRule (type: RuleType, rule: string) {
  const rawRules = await loadRules(type)
  const list = convertRulesStringToArray(rawRules)
  const filteredList = list.filter((item) => item !== rule)

  await saveRules(type, filteredList.join('\n'))
}

export async function replaceRule (type: RuleType, oldRule: string, newRule: string) {
  const rawRules = await loadRules(type)
  const list = convertRulesStringToArray(rawRules)
  const replacedList = list.map((item) => {
    if (item === oldRule) return newRule
    return item
  })

  await saveRules(type, replacedList.join('\n'))
}

export async function appendRule (type: RuleType, rule: string) {
  const rules = await loadRules(type)

  await saveRules(type, `${rules}\n${rule}`)
}
