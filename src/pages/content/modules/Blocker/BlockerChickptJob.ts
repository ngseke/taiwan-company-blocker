import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://chickpt.com.tw
 */
export class BlockerChickptJob extends Blocker {
  protected selectItems () {
    return $$('ul#job-list li')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('a.job-list-item h2.job-info-title') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.job-info-company p') as HTMLElement)
      ?.innerText
  }
}
