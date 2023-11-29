import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.104.com.tw/jobs/search
 */
export class Blocker104Jobs extends Blocker {
  protected selectItems () {
    return $$('#js-job-content > article')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return $item.dataset.jobName
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return $item.dataset.custName
  }
}
