import { Blocker } from './Blocker'
import { $, $$ } from '../dom'
import { type ActivatorPositionCallback } from '../ActionActivator'

/**
 * Applies to:
 * - https://www.104.com.tw/company/*
 */
export class Blocker104Company extends Blocker {
  protected selectItems () {
    return $$('.joblist__container .job-list-container')
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('.info-job__text') as HTMLElement)?.innerText
  }

  protected getItemCompanyName () {
    // The reason for using this selector over `h1.h1.d-inline` is the text content inside would disappear after scrolling.
    return $('meta[property="og:title"]')
      ?.getAttribute('content')
      ?.split('｜徵才中－104人力銀行')[0]
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
