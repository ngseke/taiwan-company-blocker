import { useCallback, useState } from 'react'
import { type Nullish } from '../../../types/Nullish'
import { CLICK_ITEM_ACTION, emitter, OPEN_SETTING } from '../modules/emitter'
import { useEmitter } from '../hooks/useEmitter'
import { appendRule, removeRule, replaceRule } from '../../../modules/ruleStorageAction'
import { useMatchedRules } from '../hooks/useMatchedRules'
import { Dialog } from '../../../components/Dialog'
import { Header } from './Header'
import { Radio } from '../../../components/Radio'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { SearchLinkSection } from './SearchLinkSection'
import { MatchedRulesSection } from './MatchedRulesSection'
import { type RuleType } from '../../../modules/rule'
import { EditRuleDialog, type EditRuleDialogState } from './EditRuleDialog'

export function BlockDialog () {
  const [isOpened, setIsOpened] = useState(false)

  function open () { setIsOpened(true) }
  function close () { setIsOpened(false) }

  const [type, setType] = useState<'job' | 'company' | null>(null)

  const [jobTitle, setJobTitle] = useState<Nullish<string>>(null)
  const [companyName, setCompanyName] = useState<Nullish<string>>(null)

  // TODO: refactor with RHF
  const [jobTitleDraft, setJobTitleDraft] = useState('')
  const [companyNameDraft, setCompanyNameDraft] = useState('')

  useEmitter(CLICK_ITEM_ACTION, useCallback((payload) => {
    open()

    setType(null)

    setJobTitle(payload.jobTitle)
    setCompanyName(payload.companyName)

    setJobTitleDraft(payload.jobTitle ?? '')
    setCompanyNameDraft(payload.companyName ?? '')
  }, []))

  function openSetting () {
    close()
    emitter.emit(OPEN_SETTING)
  }

  async function submit () {
    close()
    if (type === 'job') {
      await appendRule('jobTitle', jobTitleDraft)
    }
    if (type === 'company') {
      await appendRule('companyName', companyNameDraft)
    }
  }

  const isSubmitDisabled = !(
    (type === 'job' && jobTitleDraft.trim()) ||
    (type === 'company' && companyNameDraft.trim())
  )

  const { matchedRules } = useMatchedRules({ companyName, jobTitle })

  const [editRuleDialogState, setEditRuleDialogState] =
    useState<EditRuleDialogState | null>(null)

  async function handleEditRule (type: RuleType, rule: string) {
    setEditRuleDialogState({ type, rule })
  }

  return (
    <>
      <Dialog closeOnClickOutside open={isOpened} onClose={close}>
        {isOpened && (
          <div className="flex flex-col gap-4">
            <Header />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  checked={type === 'company'}
                  onChange={(checked) => {
                    if (checked) setType('company')
                  }}
                />
                <Input
                  label="公司名稱"
                  value={companyNameDraft}
                  onChange={setCompanyNameDraft}
                  onFocus={() => { setType('company') }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  checked={type === 'job'}
                  onChange={(checked) => {
                    if (checked) setType('job')
                  }}
                />
                <Input
                  label="職缺名稱"
                  value={jobTitleDraft}
                  onChange={setJobTitleDraft}
                  onFocus={() => { setType('job') }}
                />
              </div>
            </div>

            <MatchedRulesSection
              matchedRules={matchedRules}
              onEdit={handleEditRule}
            />

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                className="underline"
                type="button"
                onClick={openSetting}
              >
                管理關鍵詞
              </button>

              <div className="flex-1" />

              <Button type="button" onClick={close}>關閉</Button>
              <Button
                color="primary"
                disabled={Boolean(isSubmitDisabled)}
                type="button"
                onClick={submit}
              >
                封鎖
              </Button>
            </div>

            {companyName && (
              <>
                <hr className="border-neutral-800" />
                <SearchLinkSection companyName={companyName} />
              </>
            )}
          </div>
        )}
      </Dialog>

      <EditRuleDialog
        state={editRuleDialogState}
        onResponse={async (response) => {
          if (!editRuleDialogState) return
          setEditRuleDialogState(null)

          if (response?.action === 'remove') {
            await removeRule(
              editRuleDialogState.type,
              editRuleDialogState.rule
            )
          } else if (response?.action === 'edit') {
            await replaceRule(
              editRuleDialogState.type,
              editRuleDialogState.rule,
              response.newRule
            )
          }
        }}
      />
    </>
  )
}
