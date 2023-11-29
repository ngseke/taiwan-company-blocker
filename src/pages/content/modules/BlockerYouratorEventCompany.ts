import { Blocker } from './Blocker'
import { $$ } from './dom'
import { type ActivatorPositionCallback } from './ActionActivator'

/**
 * Applies to:
 * - https://www.yourator.co/events/*?tab=companies
 */
export class BlockerYouratorEventCompany extends Blocker {
  protected selectItems () {
    return $$(`
      #event-detail-company-and-job-section
      .grid.grid-cols-2.gap-x-1\\.5.gap-y-2.tablet\\:grid-cols-3.tablet\\:gap-4
      .shadow-company-card
    `)
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.text-lightest-navy.font-medium.truncate.text-general') as HTMLElement)
      ?.innerText
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
