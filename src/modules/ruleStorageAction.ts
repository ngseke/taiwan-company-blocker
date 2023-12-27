import { type RuleType } from './rule'
import { loadRules, saveRules } from './storage'

export async function appendRule (type: RuleType, rule: string) {
  const rules = await loadRules(type)

  await saveRules(type, `${rules}\n${rule}`)
}
