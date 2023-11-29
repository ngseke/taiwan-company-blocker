import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.cakeresume.com/jobs
 */
export class BlockerCakeresumeJobs extends Blocker {
  protected selectItems () {
    return $$('[class^=JobSearchItem_wrapper__]')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('[class^=JobSearchItem_jobTitle]') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('[class^=JobSearchItem_companyName]') as HTMLElement)
      ?.innerText
  }
}
