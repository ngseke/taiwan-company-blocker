import { Blocker } from './Blocker'
import { $$ } from '../dom'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies
 */
export class BlockerCakeresumeCompanies extends Blocker {
  protected selectItems () {
    return $$('[class^=CompanySearchItem_wrapper]')
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('[class^=CompanySearchItem_companyTitle]') as HTMLElement)
      ?.innerText
  }
}
