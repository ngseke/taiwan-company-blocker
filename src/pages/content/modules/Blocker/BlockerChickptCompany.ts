import { Blocker } from './Blocker'
import { $, $$ } from '../dom'

/**
 * Applies to:
 * - https://chickpt.com.tw/company/*
 */
export class BlockerChickptCompany extends Blocker {
  protected selectItems () {
    return $$('.company_profile #js-job ul.job_wrap li.job_wrap_item')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('h3.job_name') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName () {
    return $('.company_content h1.title')?.innerText
  }
}
