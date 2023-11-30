import { type ActivatorPositionCallback } from '../ActionActivator'
import { $, $$ } from '../dom'
import { Blocker } from './Blocker'

type TextStrategy =
  | { textType: 'textContent' }
  | { textType: 'dataset', textKey: string }
  | { textType: 'attribute', textKey: string }

type SelectorTarget = 'document' | 'item'

type SelectorStrategy = TextStrategy & {
  selectorTarget: SelectorTarget
  /** Root element if not provided  */
  selector?: string
}

type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'right' | 'left'
type Position = `${VerticalPosition}-${HorizontalPosition}`

interface ActivatorPositionStrategy {
  position: Position
  offset?: [number, number]
}

export interface CreateBlockerOptions {
  description: string
  itemsSelector: string
  jobTitleStrategy?: SelectorStrategy | string
  companyNameStrategy?: SelectorStrategy | string
  activatorPosition?: ActivatorPositionStrategy | Position
}

export function createBlocker ({
  description,
  itemsSelector,
  jobTitleStrategy,
  companyNameStrategy,
  activatorPosition = 'top-right',
}: CreateBlockerOptions) {
  void description

  function getText (
    $item: HTMLElement,
    strategyOrSelector: SelectorStrategy | string
  ) {
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

  class ExtendedBlocker extends Blocker {
    protected description = description
    protected selectItems () {
      return $$(itemsSelector)
    }

    protected getItemJobTitle ($item: HTMLElement) {
      if (!jobTitleStrategy) return null
      return getText($item, jobTitleStrategy)
    }

    protected getItemCompanyName ($item: HTMLElement) {
      if (!companyNameStrategy) return null
      return getText($item, companyNameStrategy)
    }

    protected activatorPositionCallback: ActivatorPositionCallback = ($item, $activator) => {
      const { left, top, width, height } = $item.getBoundingClientRect()
      const { width: activatorWidth, height: activatorHeight } = $activator.getBoundingClientRect()

      let position: Position
      let offsetX = 0
      let offsetY = 0

      if (typeof activatorPosition === 'string') {
        position = activatorPosition
      } else {
        position = activatorPosition.position
        offsetX = activatorPosition.offset?.[0] ?? 0
        offsetY = activatorPosition.offset?.[1] ?? 0
      }

      const positionMap: Record<Position, { x: number, y: number }> = {
        'top-left': {
          x: left + offsetX,
          y: top + offsetY,
        },
        'top-right': {
          x: left + width - activatorWidth - offsetX,
          y: top + offsetY,
        },
        'bottom-left': {
          x: left + offsetX,
          y: top + height - activatorHeight - offsetY,
        },
        'bottom-right': {
          x: left + width - activatorWidth - offsetX,
          y: top + height - activatorHeight - offsetY,
        },
      }

      return positionMap[position]
    }
  }

  return new ExtendedBlocker()
}
