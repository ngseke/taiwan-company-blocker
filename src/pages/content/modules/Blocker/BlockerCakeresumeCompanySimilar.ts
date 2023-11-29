import { Blocker } from './Blocker'
import { $$ } from '../dom'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies/... (similar jobs below)
 */
export class BlockerCakeresumeCompanySimilar extends Blocker {
  protected selectItems () {
    return $$(`
      [class^=CompanySimilarPages_container__]
      [class^=SimilarPagesListItem_container__]
    `)
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('[class^=SimilarPagesListItem_name__] a') as HTMLElement)
      ?.innerText
  }

  protected activatorPositionCallback: ActivatorPositionCallback = ($item, $activator) => {
    const { left, top, width } = $item.getBoundingClientRect()
    const { width: activatorWidth } = $activator.getBoundingClientRect()

    return {
      x: left + width - activatorWidth + 8,
      y: top - 8,
    }
  }
}
