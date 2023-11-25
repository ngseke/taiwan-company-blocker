import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.518.com.tw/job-index.html
 */
export class Blocker518 extends Blocker {
  protected selectItems () {
    return $$('.job__card')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.job__title') as HTMLElement)?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.job__comp__name') as HTMLElement)?.innerText
  }
}
