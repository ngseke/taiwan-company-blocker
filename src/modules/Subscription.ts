import { loadSubscriptions, saveSubscriptionResults } from './storage'
import { extractErrorMessage } from './extractErrorMessage'

export interface Subscription {
  name: string
  url: string
  isEnabled: boolean
}

export interface SubscriptionResultSuccess {
  name: string
  url: string
  timestamp: number
  status: 'success'
  rules: string
}

export interface SubscriptionResultError {
  name: string
  url: string
  timestamp: number
  status: 'error'
  error: string
}

export type SubscriptionResult =
  | SubscriptionResultSuccess
  | SubscriptionResultError

export type SubscriptionResults = Record<string, SubscriptionResult>

export async function fetchSubscriptionResult (subscriptions: Subscription[]) {
  const enabledSubscriptions = subscriptions.filter((subscription) => (
    subscription.isEnabled
  ))

  const resultList = await Promise.all(
    enabledSubscriptions.map<Promise<SubscriptionResult>>(async (subscription) => {
      const baseResult = {
        name: subscription.name,
        url: subscription.url,
        timestamp: +new Date(),
      }
      try {
        const response = await fetch(subscription.url, { cache: 'no-store' })

        if (!response.ok) throw new Error(String(response.status))

        const data = await response.text()

        return {
          ...baseResult,
          status: 'success',
          rules: String(data),
        }
      } catch (err) {
        return {
          ...baseResult,
          status: 'error',
          error: extractErrorMessage(err),
        }
      }
    })
  )

  const results = resultList.reduce<SubscriptionResults>((results, result) => ({
    ...results,
    [result.url]: result,
  }), {})

  return results
}

export async function updateSubscriptionResult () {
  await saveSubscriptionResults({})

  const subscriptions = await loadSubscriptions()
  const result = await fetchSubscriptionResult(subscriptions)
  await saveSubscriptionResults(result)
}
