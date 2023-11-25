import { Blocker } from './Blocker'
import { $$ } from './dom'
import style from './blocker-yourator-companies.module.sass'

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

  protected revealClassName = style.reveal
}
