import { type Nullish } from '../../../types/Nullish'
import { $ } from './dom'

export type TextStrategy =
  | { textType: 'textContent' }
  | { textType: 'dataset', textKey: string }
  | { textType: 'attribute', textKey: string }

export type SelectorTarget = 'document' | 'item'

export type SelectorStrategy = TextStrategy & {
  selectorTarget: SelectorTarget
  /** Root element if not provided  */
  selector?: string
}

export function getText (
  $item: HTMLElement,
  strategyOrSelector: Nullish<SelectorStrategy | string>
) {
  if (!strategyOrSelector) return null

  if (typeof strategyOrSelector === 'string') {
    return $item.querySelector(strategyOrSelector)?.textContent?.trim()
  }

    type Selector = (s: string) => HTMLElement | null
    const selectors: Record<SelectorTarget, Selector> = {
      document: $,
      item: (selector) => $item.querySelector(selector),
    }

    const strategy = strategyOrSelector
    const element = strategy.selector
      ? selectors[strategy.selectorTarget](strategy.selector)
      : $item

    if (strategy.textType === 'textContent') {
      return element?.textContent?.trim()
    }
    if (strategy.textType === 'dataset') {
      return element?.dataset[strategy.textKey]?.trim()
    }
    if (strategy.textType === 'attribute') {
      return element?.getAttribute(strategy.textKey)?.trim()
    }
}
