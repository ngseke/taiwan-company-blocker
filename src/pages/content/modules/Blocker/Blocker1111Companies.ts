import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.1111.com.tw/search/corp
 */
export class Blocker1111Companies extends Blocker {
  protected selectItems () {
    return $$('.job_item.item__corp')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('h5') as HTMLElement)?.innerText
  }
}
