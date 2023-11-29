import { Blocker } from './Blocker'
import { $, $$ } from '../dom'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies/.../jobs
 * - https://www.cakeresume.com/companies/...
 */
export class BlockerCakeresumeCompany extends Blocker {
  protected selectItems () {
    return $$(`
      [class^=CompanyJobItemList_jobList] >
      [class^=CompanyJobItemWithAdminTool_container__],
      [class^=CompanyAboutPage_visibleJobsWrapper]
      [class^=CompanyJobItemView_container__]
    `)
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

  protected activatorPositionCallback: ActivatorPositionCallback = ($item, $activator) => {
    const { left, top, width } = $item.getBoundingClientRect()
    const { width: activatorWidth } = $activator.getBoundingClientRect()

    return {
      x: left + width - activatorWidth,
      y: top,
    }
  }
}
