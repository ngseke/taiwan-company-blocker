import { Blocker } from './Blocker'
import { $$ } from './dom'

/**
 * Applies to:
 * - https://www.cakeresume.com/companies/*\/jobs/* (so called common applied jobs)
 */
export class BlockerCakeresumeJobCommonApplied extends Blocker {
  protected selectItems () {
    return $$(`
      [class^=CommonAppliedJobs_jobList__] >
      [class^=CommonAppliedJobItem_container__]
    `)
  }

  protected getItemJobTitle ($item: HTMLElement) {
    return ($item.querySelector('[class^=CommonAppliedJobItem_title__]') as HTMLElement)
      ?.innerText
  }

  protected getItemCompanyName ($item: HTMLElement) {
    return ($item.querySelector('[class^=CommonAppliedJobItem_pageName__]') as HTMLElement)
      ?.innerText
  }
}
