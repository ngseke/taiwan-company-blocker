import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.1111.com.tw/corp/* (similar companies in the section below)
 */
export class Blocker1111CompanySimilar extends Blocker {
  protected selectItems () {
    return $$('#similarCompanyDiv .UI_card_company')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('h3 a') as HTMLElement)?.innerText
  }
}
