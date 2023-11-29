import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.yourator.co/events/*?tab=jobs
 */
export class BlockerYouratorEventJob extends Blocker {
  protected selectItems () {
    return $$(`
      #event-detail-company-and-job-section
      .flex.flex-col.tablet\\:gap-4 > div > a
    `)
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.flex-initial.mb-1.text-general.font-bold.text-lightest-navy.truncate') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.flex-initial.text-sub.text-main-blue.hover\\:text-darkest-blue.truncate') as HTMLElement)
      ?.innerText
  }
}
