import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.518.com.tw/job-*.html (jobs in the right sidebar and  the section below)
 */
export class Blocker518JobSimilar extends Blocker {
  protected selectItems () {
    return $$(`
      .sidebarBox > ul > li,
      .similarList > .similarJob
    `)
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('a.title, a.job-link') as HTMLElement)
      ?.getAttribute('title')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('p.comp') as HTMLElement)?.innerText
  }
}
