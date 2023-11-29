import { Blocker } from './Blocker'
import { $, $$ } from '../dom'
import style from './blocker-yourator-companies.module.sass'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.yourator.co/companies/* (jobs item in the company page)
 */
export class BlockerYouratorCompanyJob extends Blocker {
  protected selectItems () {
    return $$('#current-jobs .y-job-card')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.y-new-card__title') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName () {
    return $('#company-info h1')?.innerText
  }

  protected activatorPositionCallback: ActivatorPositionCallback = ($item, $activator) => {
    const { left, top, width } = $item.getBoundingClientRect()
    const { width: activatorWidth } = $activator.getBoundingClientRect()

    return {
      x: left + width - activatorWidth,
      y: top,
    }
  }

  protected revealClassName = style.reveal
}
