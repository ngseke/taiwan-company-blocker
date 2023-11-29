import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.1111.com.tw/corp/*
 */
export class Blocker1111Company extends Blocker {
  protected selectItems () {
    return $$('#jobListPage .job_item')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('h5') as HTMLElement)?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('h6') as HTMLElement)?.innerText
      .split(' | ')[0]
  }
}
