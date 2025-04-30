import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button'
import { Dialog } from '../../../components/Dialog'
import { Editor } from '../../../components/Editor'
import { type RuleType } from '../../../modules/rule'

type Response =
  | { action: 'remove' }
  | { action: 'edit', newRule: string }
  | null

export interface EditRuleDialogState { type: RuleType, rule: string }

export function EditRuleDialog ({ state, onResponse }: {
  state: EditRuleDialogState | null
  onResponse?: (response: Response) => void
}) {
  const [ruleDraft, setRuleDraft] = useState('')
  useEffect(() => {
    if (!state) return
    setRuleDraft(state.rule)
  }, [state])

  const formattedTargetType = state?.type
    ? ({
        companyName: '公司名稱',
        jobTitle: '職缺名稱',
      })[state.type]
    : ''

  function remove () {
    onResponse?.({ action: 'remove' })
  }

  function edit () {
    onResponse?.({
      action: 'edit',
      newRule: ruleDraft.replaceAll('\n', ' '),
    })
  }

  function cancel () {
    onResponse?.(null)
  }

  return (
    <Dialog closeOnClickOutside open={Boolean(state)} onClose={cancel}>
      <div className="flex flex-col gap-4">
        <div className="text-base font-medium">編輯{formattedTargetType}規則</div>
        <Editor
          lineWrapping
          height="auto"
          value={ruleDraft}
          onChange={setRuleDraft}
        />

        <div className="flex gap-2">
          <Button onClick={remove}>移除規則</Button>
          <div className="flex-1" />
          <Button onClick={cancel}>取消</Button>
          <Button color="primary" onClick={edit}>更新規則</Button>
        </div>
      </div>
    </Dialog>
  )
}
