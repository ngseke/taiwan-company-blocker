import { type ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import { type SubmitResult } from '../../types/SubmitResult'
import { loadRules, saveRules } from '../../modules/storage'
import { checkHasIllogicalRule, type RuleType } from '../../modules/rule'
import { Title } from '../Title'
import { Button } from '../Button'
import { faCheck, faExclamationTriangle, faFileExport, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { Editor } from '../Editor'
import { cn } from '../../modules/cn'
import { type Nullish } from '../../types/Nullish'
import { exportData } from '../../pages/options/components/modules/exportData'
import { useBeforeUnload } from '../../pages/options/hooks/useBeforeUnload'
import { useForm } from 'react-hook-form'

function ExportButton (props: ComponentProps<typeof Button>) {
  return (
    <Button type="button" {...props}>
      <div className="flex items-center gap-1.5">
        <FontAwesomeIcon icon={faFileExport} />
        匯出
      </div>
    </Button>
  )
}

function Code ({ className, ...restProps }: ComponentProps<'code'>) {
  return (
    <code
      className={cn('text-red-500 before:text-neutral-400 after:text-neutral-400 bg-red-500/10 rounded-sm px-1', className)}
      {...restProps}
    />
  )
}

function IllogicalRulesAlert ({ show }: { show?: boolean }) {
  if (!show) return null

  return (
    <div className="rounded-lg bg-amber-500 p-3 py-2 text-neutral-900 duration-200">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      在規則中偵測到了 <Code>*</Code> 或 <Code>**</Code>，這將會封鎖<b>所有</b>職缺或公司。
    </div>
  )
}

function SubmitResultMessage ({ value }: { value?: Nullish<SubmitResult> }) {
  if (!value) return null
  return (
    <div className="text-xs duration-150">
      {value.type === 'success' && (
        <FontAwesomeIcon icon={faCheck} />
      )}

      {value.type === 'error' && (
        <FontAwesomeIcon icon={faTriangleExclamation} />
      )}

      {' '}
      {value.message}
    </div>
  )
}

function InstructionArticle () {
  return (
    <article className="space-y-2">
      <p>
        可以使用萬用字元 <Code>*</Code> 來匹配零個或 N 個字元，例如：
      </p>
      <ol className="list-inside list-decimal">
        <li><Code>*海外實習*</Code> 會匹配到包含「<i>海外實習</i>」的項目</li>
        <li><Code>產品行銷專員</Code> 只會匹配到和「<i>產品行銷專員</i>」<strong>一字不差</strong>的項目</li>
      </ol>
      <p>
        使用正規表示式（regex）來建立更複雜的規則，例如：
      </p>
      <ol className="list-inside list-decimal">
        <li><Code>/(內|外)場/</Code> 會匹配到包含「<i>內場</i>」或「<i>外場</i>」的項目</li>
        <li><Code>/BACK(-?)END/i</Code> 會匹配到包含無論大小寫的「<i>Backend</i>」或「<i>Back-end</i>」的項目</li>
      </ol>
      <p>
        使用 <Code>#</Code> 在規則尾端加入註解，例如：<Code>某某有限公司 # 我沒興趣</Code>
      </p>
    </article>
  )
}

export function RulesOptions ({ isInContent, highlight }: {
  isInContent?: boolean
  highlight?: Nullish<{ type: RuleType, text: string }>
}) {
  const { watch, reset, setValue, formState: { isDirty } } = useForm({
    defaultValues: {
      jobTitleRules: null as string | null,
      companyNameRules: null as string | null,
    },
  })

  const jobTitleRules = watch('jobTitleRules')
  const companyNameRules = watch('companyNameRules')

  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)

  const initializeForm = useCallback(async () => {
    reset({
      jobTitleRules: await loadRules('jobTitle'),
      companyNameRules: await loadRules('companyName'),
    })
  }, [reset])

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  const submitResultTimer = useRef<NodeJS.Timeout | null>(null)

  async function submit () {
    setSubmitResult(null)
    if (submitResultTimer.current) {
      clearTimeout(submitResultTimer.current)
    }

    try {
      if (jobTitleRules != null) {
        await saveRules('jobTitle', jobTitleRules)
      }
      if (companyNameRules != null) {
        await saveRules('companyName', companyNameRules)
      }
      await initializeForm()
      setSubmitResult({
        type: 'success',
        message: '儲存成功',
      })

      submitResultTimer.current = setTimeout(() => {
        setSubmitResult(null)
      }, 2500)
    } catch (err) {
      setSubmitResult({
        type: 'error',
        message: `儲存失敗! (${String(err)})`,
      })
    }
  }

  useBeforeUnload(Boolean(!isInContent && isDirty))

  const hasIllogicalRules = (
    jobTitleRules != null &&
    companyNameRules != null &&
    (
      checkHasIllogicalRule(jobTitleRules) ||
      checkHasIllogicalRule(companyNameRules)
    )
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Title>公司名稱</Title>
        <ExportButton onClick={() => {
          if (!companyNameRules) return
          exportData(companyNameRules, 'company-name-rules.txt')
        }}
        />
      </div>

      {companyNameRules != null && (
        <Editor
          highlightText={highlight?.type === 'companyName' ? highlight.text : null}
          testId={OPTIONS_TEST_IDS.companyNameRulesEditor}
          value={companyNameRules}
          onChange={(value) => {
            setValue('companyNameRules', value, { shouldDirty: true })
            setSubmitResult(null)
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <Title>職缺名稱</Title>
        <ExportButton
          onClick={() => {
            if (!jobTitleRules) return
            exportData(jobTitleRules, 'job-title-rules.txt')
          }}
        />
      </div>

      {jobTitleRules != null && (
        <Editor
          highlightText={highlight?.type === 'jobTitle' ? highlight.text : null}
          testId={OPTIONS_TEST_IDS.jobTitleRulesEditor}
          value={jobTitleRules}
          onChange={(value) => {
            setValue('jobTitleRules', value, { shouldDirty: true })
            setSubmitResult(null)
          }}
        />
      )}

      <div
        className="sticky bottom-0 -mx-6 -my-2 flex flex-col gap-4 bg-neutral-900 px-6 py-4 before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:bg-gradient-to-t before:from-neutral-900 before:to-transparent
      "
      >
        <IllogicalRulesAlert show={hasIllogicalRules} />

        <div className="flex items-center justify-end gap-3">
          <SubmitResultMessage value={submitResult} />
          <Button
            color="primary"
            disabled={!isDirty}
            testId={OPTIONS_TEST_IDS.rulesSaveButton}
            onClick={submit}
          >
            儲存
          </Button>
        </div>
      </div>

      {!isInContent && (
        <>
          <hr className="border-neutral-800" />
          <InstructionArticle />
        </>
      )}
    </div>

  )
}
