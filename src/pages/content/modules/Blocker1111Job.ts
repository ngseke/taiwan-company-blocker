import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.1111.com.tw/search/job
 */
export class Blocker1111Job extends Blocker {
  protected selectItems () {
    return $$('.job_item.item__job')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('h5') as HTMLElement)?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('h6') as HTMLElement)?.innerText
      .split(' | ')[0]
  }
}
