import { detectPagePlatform } from './platform'
import { loadParsedRules } from '../../../modules/ruleStorage'
import { $$ } from './dom'
import { ActionActivatorFixed } from './ActionActivatorFixed'
import { type Candidate } from './Candidate'
import { getText } from './getText'
import { loadBlockMethod, loadIsEnabled } from '../../../modules/storage'
import style from './blocker.module.sass'
import { match } from '../../../modules/pattern'
import { createSafeMutationObserver } from './createSafeMutationObserver'
import { UPDATE_ICON_MESSAGE_NAME } from '../../../modules/constants'
import { ActionActivatorAbsolute } from './ActionActivatorAbsolute'
import { type Blocker } from '../../../schemas/blocker'
import { blockersGroup } from './blockersGroup'

export class BlockerManager2 {
  private readonly blockerOptions: Blocker[]
  private readonly actionActivatorFixed = new ActionActivatorFixed()
  private readonly actionActivatorAbsolute = new ActionActivatorAbsolute()

  private candidates: Candidate[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw Error('Cannot detect platform!')

    this.blockerOptions = blockersGroup[platformName]

    const observer = createSafeMutationObserver(() => {
      const candidates: Candidate[] = []
      const weakSet = new WeakSet<HTMLElement>()

      this.blockerOptions.forEach((options) => {
        $$(options.itemsSelector)
          .filter((element) => !weakSet.has(element))
          .map((element) => {
            return {
              options,
              itemElementRef: new WeakRef(element),
              companyName: getText(element, options.companyNameStrategy),
              jobTitle: getText(element, options.jobTitleStrategy),
            } satisfies Candidate
          })
          .forEach((item) => {
            const element = item.itemElementRef.deref()
            if (!element) return

            weakSet.add(element)
            candidates.push(item)
          })
      })

      this.candidates = candidates
      this.render()
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  async render () {
    const isEnabled = await loadIsEnabled()
    const blockMethod = await loadBlockMethod()
    const { companyNameRules, jobTitleRules } = await loadParsedRules()

    this.candidates.forEach(({ itemElementRef }) => {
      const $item = itemElementRef.deref()
      /* Remove all class names */
      $item?.classList.remove(...Object.values(style))
      $item?.classList.add(style.base)
    })

    if (!isEnabled) {
      this.actionActivatorFixed.stop()
      this.actionActivatorAbsolute.stop()

      this.blockedCount = null
    } else {
      this.actionActivatorFixed.start(
        this.candidates.filter((candidate) => (
          candidate.options.activatorStrategy === 'fixed'
        ))
      )

      this.actionActivatorAbsolute.start(
        this.candidates.filter((candidate) => (
          !candidate.options.activatorStrategy ||
          candidate.options.activatorStrategy === 'absolute'
        ))
      )

      const matchedCandidates = this.candidates.filter((candidate) => {
        const { companyName, jobTitle } = candidate
        return (
          match(companyName, companyNameRules) ||
          match(jobTitle, jobTitleRules)
        )
      })

      /* Add class names on matched items */
      matchedCandidates.forEach((candidate) => {
        if (!isEnabled) return

        const { itemElementRef } = candidate
        const $item = itemElementRef.deref()

        if (!$item) return

        const className = {
          blur: style.blur,
          opacity: style.opacity,
          hide: style.hide,
        }[blockMethod]

        $item.classList.add(style.base, className)
      })

      this.blockedCount = matchedCandidates.length
    }

    chrome.runtime.sendMessage({
      action: UPDATE_ICON_MESSAGE_NAME,
      isEnabled,
      blockedCount: this.blockedCount,
    })
  }

  blockedCount: number | null = null
}
