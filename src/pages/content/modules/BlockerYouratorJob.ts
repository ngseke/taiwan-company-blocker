import { Blocker } from './Blocker'
import { $$ } from './dom'
import style from './blocker-yourator-jobs.module.sass'

/**
 * Applies to:
 * - https://www.yourator.co/jobs
 */
export class BlockerYouratorJob extends Blocker {
  protected selectItems () {
    return $$('#normal-jobs > div')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.flex-initial.mb-1.text-general.font-bold.text-lightest-navy.truncate') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('.flex-initial.text-sub.text-main-blue.truncate') as HTMLElement)
      ?.innerText
  }

  protected revealClassName = style.reveal
}
