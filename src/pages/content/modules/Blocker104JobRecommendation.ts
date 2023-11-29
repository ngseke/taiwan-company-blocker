import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.104.com.tw/job/* (recommendations in the right panel)
 */
export class Blocker104JobRecommendation extends Blocker {
  protected selectItems () {
    return $$(`
      [data-gtm-similar="點擊職缺"],
      [data-gtm-sidebar="你可能有興趣的工作"]
    `)
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return $item.querySelector('.text-mode b')?.getAttribute('title')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return $item.querySelector('.text-mode p')?.getAttribute('title')
  }
}
