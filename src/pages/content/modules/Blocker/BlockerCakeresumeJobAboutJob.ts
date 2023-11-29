import { type ActivatorPositionCallback } from '../ActionActivator'
import { Blocker } from './Blocker'
import { $, $$ } from '../dom'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies/.../jobs/... (jobs in "about the company" section below)
 */
export class BlockerCakeresumeJobAboutJob extends Blocker {
  protected selectItems () {
    return $$('[class^=JobItem_container__]')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('[class^=JobItem_title__]') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName () {
    return $('[class^=AboutBlock_companyName__]')
      ?.innerText
  }

  protected activatorPositionCallback: ActivatorPositionCallback = ($item) => {
    const { left, top, width } = $item.getBoundingClientRect()

    return {
      x: left + width,
      y: top,
    }
  }
}
