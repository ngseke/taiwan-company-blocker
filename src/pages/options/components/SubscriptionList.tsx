import { faCheck, faEllipsisVertical, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '../../../components/Checkbox'
import { useTime } from '../../../hooks/useTime'
import { cn } from '../../../modules/cn'
import { type Subscription, type SubscriptionResults } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function SubscriptionList ({ value, subscriptionResults, onChange, onClickDetail }: {
  value?: Nullish<Subscription[]>
  subscriptionResults?: Nullish<SubscriptionResults>

  onChange: (list: Subscription[]) => void
  onClickDetail: (index: number) => void
}) {
  function getResult (url: string) {
    return subscriptionResults?.[url]
  }

  function getResultError (url: string) {
    const result = getResult(url)
    if (result?.status !== 'error') return
    return result.error
  }

  function getCheckboxValue (index: number) {
    return value?.[index]?.isEnabled
  }

  function setCheckboxValue (index: number, isEnabled: boolean) {
    if (!value) return
    const newList = [...value]
    const newSubscription: Subscription = { ...newList[index], isEnabled }
    newList[index] = newSubscription
    onChange(newList)
  }
  const { getFormattedTime, getRelativeTime } = useTime()

  if (!value?.length) return null

  return (

    <div className="flex flex-col rounded-lg">
      <div className="flex min-w-[240px] flex-col gap-1 font-normal">
        {value?.map((item, index) => (
          <button
            key={index}
            className="flex w-full items-center rounded-lg p-1 text-start hover:bg-neutral-800/50"
            type="button"
            onClick={() => { onClickDetail(index) }}
          >
            <div>
              <Checkbox
                checked={getCheckboxValue(index)}
                onChange={(checked) => { setCheckboxValue(index, checked) }}
                onClick={(event) => { event.stopPropagation() }}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col px-2">
              <div
                className={cn('truncate', {
                  'text-red-500': getResult(item.url)?.status === 'error',
                })}
              >
                {item.name}
              </div>
              <div className="truncate text-xs text-neutral-500">
                {(() => {
                  if (!getResult(item.url)) return <span>-</span>
                  if (getResult(item.url)?.status === 'success') {
                    return (
                      <span title={getFormattedTime(getResult(item.url)?.timestamp)}>
                        {/* @ts-expect-error -- Remove Vue */}
                        <FontAwesomeIcon icon={faCheck} />{' '}
                        {getRelativeTime(getResult(item.url)?.timestamp)}
                      </span>
                    )
                  }

                  return (
                    <span>
                      {/* @ts-expect-error -- Remove Vue */}
                      <FontAwesomeIcon icon={faTriangleExclamation} />{' '}
                      載入失敗 ({getResultError(item.url)})
                    </span>
                  )
                })()}

              </div>
            </div>

            <div className="ml-auto flex">
              <button
                className="h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-neutral-500/10 active:bg-neutral-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onClickDetail(index)
                }}
              >
                {/* @ts-expect-error -- Remove Vue */}
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </button>
        ))}

      </div>
    </div>
  )
}
