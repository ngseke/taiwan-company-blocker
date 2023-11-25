import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.104.com.tw/company/search/
 * - https://www.104.com.tw/company/topic/recommend
 */
export class Blocker104Company extends Blocker {
  protected selectItems () {
    return $$('.container .company-list')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return $item.querySelector('.company-name-link > a')
      ?.getAttribute('title')
  }
}
