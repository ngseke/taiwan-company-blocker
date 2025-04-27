import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '../../../components/Dialog'
import { Editor } from '../../../components/Editor'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../components/Button'
import { type Subscription, type SubscriptionResult } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'

export function ViewSubscriptionDialog ({ subscription, result, onClose, onRemove }: {
  subscription: Nullish<Subscription>
  result: Nullish<SubscriptionResult>
  onClose: () => void
  onRemove: () => void
}) {
  const url = subscription?.url

  const resultRules = (() => {
    if (result?.status !== 'success') return
    return result.rules
  })()

  const resultError = (() => {
    if (result?.status !== 'error') return
    return result.error
  })()

  return (
    <Dialog
      closeOnClickOutside
      open={Boolean(subscription)}
      width="500px"
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <div className="truncate text-base font-medium">{subscription?.name}</div>

        <div className="flex flex-col gap-4">
          <div className="leading-none">
            <a className="break-all text-xs" href={url} rel="noreferrer" target="_blank">{url}</a>
          </div>

          {resultRules != null && (
            <Editor disabled height={300} value={resultRules} />
          )}

          {resultError != null && (
            <div>
              {/* @ts-expect-error -- Remove Vue */}
              <FontAwesomeIcon icon={faTriangleExclamation} />{' '}
              載入失敗 {resultError}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <Button
            onClick={() => {
              onRemove()
              onClose()
            }}
          >移除訂閱</Button>
          <Button color="primary" onClick={onClose}>關閉</Button>
        </div>
      </div>
    </Dialog>
  )
}
