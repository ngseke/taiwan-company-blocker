import { Blocker } from './Blocker'
import { $, $$ } from './dom'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies/*\/jobs
 */
export class BlockerCakeresumeCompanyJob extends Blocker {
  protected selectItems () {
    return $$('[class^=CompanyJobItemList_jobList] > [class^=CompanyJobItemWithAdminTool_container__]')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('[class^=CompanyJobItemView_title]') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName () {
    return $(`
      [class^=CompanyHeader_main__]
      [class^=CompanyHeader_companyNameWrapper__]
      [class^=CompanyHeader_companyName__]
    `)?.innerText
  }
}
