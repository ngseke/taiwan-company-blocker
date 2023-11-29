import { Blocker } from './Blocker'
import { $$ } from '../dom'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.yourator.co/companies/.../jobs/...
 */
export class BlockerYouratorJob extends Blocker {
  protected selectItems () {
    return $$('.job-recommendations .y-job-card')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.y-new-card__title') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.y-new-card__subtitle') as HTMLElement)
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
