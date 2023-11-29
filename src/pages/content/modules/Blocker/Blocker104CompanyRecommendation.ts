import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.104.com.tw/company/*
 */
export class Blocker104CompanyRecommendation extends Blocker {
  protected selectItems () {
    return $$(`
      .sidebarContainer
      .sidebar-dialog.rounded.mb-4.sidebar-dialog-list
      .sidebar-dialog-list__body > a
    `)
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('b.h4.d-block.text-truncate') as HTMLElement)
      ?.innerText
  }
}
