import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://chickpt.com.tw/job-*
 */
export class BlockerChickptJobRecommendation extends Blocker {
  protected selectItems () {
    return $$('.wrap-job-content #js-job ul.job_wrap li.job_wrap_item')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('h3.job_name') as HTMLElement)
      ?.innerText
  }
}
