import { Blocker } from './Blocker'
import { $, $$ } from '../dom'

/**
 * Applies to:
 * - https://www.518.com.tw/company-* (job items below)
 */
export class Blocker518Company extends Blocker {
  protected selectItems () {
    return $$('#listContent .jobSumContent')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('li.title a') as HTMLElement)?.innerText
  }

  protected getItemCompanyName () {
    return $('h1.comp-name strong')?.innerText
  }
}
