import { Blocker } from './Blocker'
import { $$ } from '../dom'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.518.com.tw/company-* (similar companies in the right panel)
 */
export class Blocker518CompanyRecommendation extends Blocker {
  protected selectItems () {
    return $$('.comp-sidebox ul.similar li')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('a') as HTMLElement)?.innerText
  }

  protected activatorPositionCallback: ActivatorPositionCallback = ($item, $activator) => {
    const { left, top, width } = $item.getBoundingClientRect()
    const { width: activatorWidth } = $activator.getBoundingClientRect()

    return {
      x: left + width - activatorWidth,
      y: top,
    }
  }
}
