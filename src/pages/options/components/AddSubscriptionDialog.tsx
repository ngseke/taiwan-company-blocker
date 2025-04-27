import { useEffect, useState } from 'react'
import { validateUrl } from '../../../modules/validateUrl'
import { Dialog } from '../../../components/Dialog'
import { Input } from '../../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../components/Button'

type Response = { name: string, url: string } | null

export type AddSubscriptionDialogState = { name: string } | null

export function AddSubscriptionDialog ({ state, onResponse }: {
  state: AddSubscriptionDialogState
  onResponse?: (response: Response) => void
}) {
  const [nameDraft, setNameDraft] = useState('')
  const [urlDraft, setUrlDraft] = useState('')

  const shouldDisableButton = !nameDraft || !validateUrl(urlDraft)

  useEffect(() => {
    setNameDraft(state?.name ?? '')
    setUrlDraft('https://')
  }, [state])

  function submit () {
    onResponse?.({ name: nameDraft.trim(), url: urlDraft.trim() })
  }

  function cancel () {
    onResponse?.(null)
  }

  return (
    <Dialog open={Boolean(state)} onClose={cancel}>
      <div className="flex flex-col gap-4">
        <div className="text-base font-medium">新增訂閱</div>

        <div className="flex flex-col gap-4">
          <Input label="名稱" maxLength={100} value={nameDraft} onChange={setNameDraft} />
          <Input label="URL" value={urlDraft} onChange={setUrlDraft} />
        </div>

        <a
          className="block rounded-lg bg-neutral-800 p-3 py-2 text-neutral-200 duration-200"
          href="https://github.com/ngseke/company-list"
          rel="noreferrer" target="_blank"
        >
          <FontAwesomeIcon icon={faStar} />
          也可以查看由此擴充功能作者維護的<span className="underline">公司訂閱列表</span>，快速過濾如博弈、外包等特定產業。
        </a>

        <div className="flex justify-end gap-2">
          <Button onClick={cancel}>取消</Button>
          <Button
            color="primary"
            disabled={shouldDisableButton}
            onClick={submit}
          >
            儲存
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
