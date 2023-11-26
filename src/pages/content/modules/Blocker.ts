import { customAlphabet } from 'nanoid'
import { lowercase } from 'nanoid-dictionary'
import { $$ } from './dom'
import style from './blocker.module.sass'
import { match } from './pattern'
import { type Nullish } from '../../../types/Nullish'

const nanoid = customAlphabet(lowercase, 6)

export type BlockMethod = 'opacity' | 'hide'
export type BlockState = 'block' | 'reveal'

export abstract class Blocker {
  protected abstract selectItems (): HTMLElement[]

  protected revealClassName = style.reveal
  protected jobTitlePatterns: string[] | null = null
  protected companyNamePatterns: string[] | null = null
  protected observer: MutationObserver | null = null

  private readonly datasetKey = `taiwan_company_blocker_${nanoid()}`

  method: BlockMethod = 'opacity'
  state: BlockState = 'block'

  private get isStarted () {
    return Boolean(this.observer)
  }

  protected getItemJobTitle (_$item: HTMLElement): Nullish<string> {
    return null
  }

  protected getItemCompanyName (_$item: HTMLElement): Nullish<string> {
    return null
  }

  private filterMatchedItems ($items: HTMLElement[]) {
    return $items.filter(($item) => {
      const isHandled = this.datasetKey in $item.dataset
      if (isHandled) return false

      const companyName = this.getItemCompanyName($item)?.trim()
      const jobTitle = this.getItemJobTitle($item)?.trim()

      const isCompanyNameMatched = Boolean(
        companyName &&
        this.companyNamePatterns?.some((pattern) => match(companyName, pattern))
      )
      const isJobTitleMatched = Boolean(
        jobTitle &&
        this.jobTitlePatterns?.some((pattern) => match(jobTitle, pattern))
      )

      const isMatched = isCompanyNameMatched || isJobTitleMatched

      return isMatched
    })
  }

  private selectHandledItems () {
    return $$(`[data-${this.datasetKey}]`)
  }

  get blockedCount () {
    return this.selectHandledItems().length
  }

  private removeAllClassNames ($item: HTMLElement) {
    const classNames = [style.opacity, style.hide, this.revealClassName]
    $item.classList.remove(...classNames)
  }

  private blockItemByCurrentMethod ($item: HTMLElement) {
    this.removeAllClassNames($item)

    const className = {
      hide: style.hide,
      opacity: style.opacity,
    }[this.method]
    $item.classList.add(className)
  }

  private revealItem ($item: HTMLElement) {
    this.removeAllClassNames($item)
    $item.classList.add(this.revealClassName)
  }

  private unrevealItem ($item: HTMLElement) {
    this.blockItemByCurrentMethod($item)
  }

  reveal () {
    this.state = 'reveal'
    this.selectHandledItems().forEach(($item) => {
      this.revealItem($item)
    })
    return this
  }

  unreveal () {
    this.state = 'block'
    this.selectHandledItems().forEach(($item) => {
      this.unrevealItem($item)
    })
    return this
  }

  private markItem ($item: HTMLElement) {
    $item.dataset[this.datasetKey] = ''

    const action = {
      block: () => { this.blockItemByCurrentMethod($item) },
      reveal: () => { this.revealItem($item) },
    }[this.state]
    action()
  }

  private unmarkItem ($item: HTMLElement) {
    $item.dataset[this.datasetKey] = undefined
    this.removeAllClassNames($item)
  }

  private tryMark () {
    if (!this.isStarted) return

    const $items = this.selectItems()
    const matchedItems = this.filterMatchedItems($items)
    matchedItems.forEach(($item) => { this.markItem($item) })
  }

  setBlockMethod (method: BlockMethod) {
    this.method = method
    this.tryMark()
    return this
  }

  setCompanyNamePatterns (patterns: string[]) {
    this.companyNamePatterns = patterns
    this.tryMark()
    return this
  }

  setJobTitlePatterns (patterns: string[]) {
    this.jobTitlePatterns = patterns
    this.tryMark()
    return this
  }

  start () {
    if (this.isStarted) return this

    this.observer = new MutationObserver(() => {
      this.tryMark()
    })
    this.observer.observe(
      document.documentElement,
      { childList: true, subtree: true }
    )
    this.tryMark()

    return this
  }

  stop () {
    this.observer?.disconnect()
    this.observer = null

    this.selectHandledItems().forEach($item => { this.unmarkItem($item) })
    return this
  }
}
