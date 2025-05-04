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
import { useForm } from 'react-hook-form'
import { type Candidate } from '../modules/Candidate'
import { Divider } from '../../../components/Divider'

export function BlockDialog () {
  const [candidate, setCandidate] = useState<Nullish<Candidate>>(null)
  function close () {
    setCandidate(null)
  }

  const { watch, reset, setValue } = useForm({
    defaultValues: {
      type: null as 'job' | 'company' | null,
      jobTitle: '',
      companyName: '',
    },
  })

  const type = watch('type')
  const jobTitle = watch('jobTitle')
  const companyName = watch('companyName')

  useEmitter(CLICK_ITEM_ACTION, useCallback((payload) => {
    setCandidate(payload)
    reset({
      type: null,
      jobTitle: payload.jobTitle ?? '',
      companyName: payload.companyName ?? '',
    })
  }, [reset]))

  function openSetting () {
    emitter.emit(OPEN_SETTING)
  }

  async function submit () {
    if (!type) return

    close()
    await ({
      job: async () => {
        await appendRule('jobTitle', jobTitle)
      },
      company: async () => {
        await appendRule('companyName', companyName)
      },
    })[type]()
  }

  const isSubmitDisabled = !(
    (type === 'job' && jobTitle.trim()) ||
    (type === 'company' && companyName.trim())
  )

  const { matchedRules } = useMatchedRules({
    jobTitle: candidate?.jobTitle,
    companyName: candidate?.companyName,
  })

  const [editRuleDialogState, setEditRuleDialogState] =
    useState<EditRuleDialogState | null>(null)

  async function handleEditRule (type: RuleType, rule: string) {
    emitter.emit(OPEN_SETTING, { type, text: rule })
  }

  return (
    <>
      <Dialog closeOnClickOutside open={Boolean(candidate)} onClose={close}>
        {candidate && (
          <div className="flex flex-col gap-4">
            <Header />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  checked={type === 'company'}
                  onChange={(checked) => {
                    if (checked) setValue('type', 'company', { shouldDirty: true })
                  }}
                />
                <Input
                  label="公司名稱"
                  value={companyName}
                  onChange={(value) => { setValue('companyName', value, { shouldDirty: true }) }}
                  onFocus={() => {
                    setValue('type', 'company', { shouldDirty: true })
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  checked={type === 'job'}
                  onChange={(checked) => {
                    if (checked) setValue('type', 'job', { shouldDirty: true })
                  }}
                />
                <Input
                  label="職缺名稱"
                  value={jobTitle}
                  onChange={(value) => { setValue('jobTitle', value, { shouldDirty: true }) }}
                  onFocus={() => {
                    setValue('type', 'job', { shouldDirty: true })
                  }}
                />
              </div>
            </div>

            <MatchedRulesSection
              matchedRules={matchedRules}
              onEdit={handleEditRule}
            />

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                className="py-1.5 font-bold duration-150 hover:opacity-50"
                type="button"
                onClick={openSetting}
              >
                管理所有關鍵詞
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

            {candidate.companyName && (
              <>
          <Divider />
                <SearchLinkSection companyName={candidate.companyName} />
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
