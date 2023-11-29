import { querySelectorDeep } from 'query-selector-shadow-dom'
import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.104.com.tw/company/search/
 * - https://www.104.com.tw/company/topic/recommend
 */
export class Blocker104Company extends Blocker {
  protected selectItems () {
    return $$('.container .company-list, .company-lists__item')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return querySelectorDeep(
      '.company-name-link > a, .advert-type27__middle__header__title',
      $item
    )?.getAttribute('title')
  }
}
