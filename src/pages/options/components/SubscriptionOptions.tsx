import { useState } from 'react'
import { Button } from '../../../components/Button'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { useChromeStorageListener } from '../../../hooks/useChromeStorageListener'
import { SUBSCRIPTION_RESULTS_KEY, SUBSCRIPTIONS_KEY } from '../../../modules/storage'
import { type Subscription, updateSubscriptionResult } from '../../../modules/Subscription'
import { AddSubscriptionDialog, type AddSubscriptionDialogState } from './AddSubscriptionDialog'
import { Title } from '../../../components/Title'
import { ViewSubscriptionDialog } from './ViewSubscriptionDialog'
import { SubscriptionList } from './SubscriptionList'

export function SubscriptionOptions () {
  const [subscriptions, setSubscriptions] = useChromeStorage(SUBSCRIPTIONS_KEY)
  const [addSubscriptionDialogState, setAddSubscriptionDialogState] =
    useState<AddSubscriptionDialogState>(null)

  async function create () {
    if (!subscriptions) return
    const name = (() => {
      const names = subscriptions.map((subscription) => subscription.name)
      for (let i = 1; i < 100; i++) {
        const name = `我的訂閱 #${i}`
        if (!names.includes(name)) return name
      }
      return ''
    })()

    setAddSubscriptionDialogState({ name })
  }

  const [subscriptionResults] = useChromeStorage(SUBSCRIPTION_RESULTS_KEY)

  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  async function update () {
    try {
      setIsUpdating(true)
      setUpdateError(null)
      await updateSubscriptionResult()
    } catch (err) {
      setUpdateError('發生錯誤，請稍候再試一次')
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  useChromeStorageListener(update, SUBSCRIPTIONS_KEY)

  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null)

  const activeSubscriptionResult = (
    subscriptionResults?.[activeSubscription?.url ?? '']
  )

  function handleClickDetail (targetIndex: number) {
    setActiveSubscription(
      subscriptions?.find((_, index) => index === targetIndex) ?? null
    )
  }

  function removeActiveSubscription () {
    if (!subscriptions) return
    setSubscriptions(
      subscriptions?.filter(
        (subscription) => subscription !== activeSubscription
      )
    )
  }

  return (
    <>
      <AddSubscriptionDialog
        state={addSubscriptionDialogState}
        onResponse={(response) => {
          if (response && subscriptions) {
            const newSubscription: Subscription = {
              ...response,
              isEnabled: true,
            }
            setSubscriptions([...subscriptions, newSubscription])
          }
          setAddSubscriptionDialogState(null)
        }}

      />

      <ViewSubscriptionDialog
        result={activeSubscriptionResult}
        subscription={activeSubscription}
        onClose={() => { setActiveSubscription(null) }}
        onRemove={removeActiveSubscription}
      />

      <div className="flex flex-col gap-4">
        <Title>訂閱公司名稱規則</Title>
        <p>訂閱他人提供的規則列表，每天會自動從該 URL 抓取。</p>

        <SubscriptionList
          subscriptionResults={subscriptionResults}
          value={subscriptions}
          onChange={setSubscriptions}
          onClickDetail={handleClickDetail}
        />

        <div className="flex items-start gap-2">
          <Button color="primary" onClick={create}>
            新增訂閱
          </Button>
          <Button
            disabled={isUpdating || !subscriptions?.length}
            loading={isUpdating}
            onClick={update}
          >
            更新
          </Button>
        </div>
        {updateError && (
          <div className="text-xs">{updateError}</div>
        )}
      </div>
    </>
  )
}
