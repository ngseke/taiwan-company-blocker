import { Blocker } from './Blocker'
import { $$ } from './dom'
import style from './blocker-yourator-companies.module.sass'
import { type ActivatorPositionCallback } from './ActionActivator'

/**
 * Applies to:
 * - https://www.yourator.co/companies
 */
export class BlockerYouratorCompany extends Blocker {
  protected selectItems () {
    return $$('#y-company-list-cards .container .company-cards__column')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.y-new-card__title.flex-initial.truncate') as HTMLElement)
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

  protected revealClassName = style.reveal
}
