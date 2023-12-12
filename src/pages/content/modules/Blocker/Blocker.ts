import style from './blocker.module.sass'
import { match } from '../../../../modules/pattern'
import { type Nullish } from '../../../../types/Nullish'
import { Marker } from '../Marker'
import { ActionActivator, type ActivatorPositionCallback } from '../ActionActivator'
import { without } from 'lodash-es'
import { CLICK_ITEM_ACTION, emitter } from '../emitter'
import { BlockerDebugger } from '../BlockerDebugger'
import { type BlockMethod } from '../../../../modules/BlockMethod'

export type MarkValue = 'matched' | 'notMatched'

export abstract class Blocker {
  private observer: MutationObserver | null = null
  private method: BlockMethod = 'opacity'
  private readonly marker = new Marker()
  private actionActivator: ActionActivator | null = null
  private blockerDebugger: BlockerDebugger | null = null
  private jobTitlePatterns: string[] | null = null
  private companyNamePatterns: string[] | null = null

  protected readonly description: string | null = null

  private get isStarted () {
    return Boolean(this.observer)
  }

  /** Select and return job or company items on the page */
  protected abstract selectItems (): HTMLElement[]

  /** Extract the job title from the HTML element of job item. */
  protected getItemJobTitle (_$item: HTMLElement): Nullish<string> {
    return null
  }

  /** Extract the company name from the HTML element of job item */
  protected getItemCompanyName (_$item: HTMLElement): Nullish<string> {
    return null
  }

  /**
   * Return the position where the action activator renders based on `$item`
   * and `$activator` HTML element
   */
  protected activatorPositionCallback: Nullish<ActivatorPositionCallback> = null

  private getIsMatched ($item: HTMLElement) {
    const companyName = this.getItemCompanyName($item)?.trim()
    const jobTitle = this.getItemJobTitle($item)?.trim()

    const isCompanyNameMatched = Boolean(
      companyName &&
      match(companyName, this.companyNamePatterns ?? [])
    )
    const isJobTitleMatched = Boolean(
      jobTitle &&
      match(jobTitle, this.jobTitlePatterns ?? [])
    )

    const isMatched = isCompanyNameMatched || isJobTitleMatched

    return isMatched
  }

  get blockedCount () {
    return this.marker.selectMarkedItems()
      .filter(($item) => this.marker.getMarkValue($item) === 'matched')
      .length
  }

  private removeAllClassNames ($item: HTMLElement) {
    const classNamesWithoutBase = without(
      Object.values(style),
      style.base
    )
    $item.classList.remove(...classNamesWithoutBase)
  }

  private addBaseClassName ($item: HTMLElement) {
    $item.classList.add(style.base)
  }

  private removeBaseClassName ($item: HTMLElement) {
    $item.classList.remove(style.base)
  }

  private blockItemByCurrentMethod ($item: HTMLElement) {
    this.removeAllClassNames($item)

    const className = {
      hide: style.hide,
      opacity: style.opacity,
    }[this.method]
    $item.classList.add(className)
  }

  private modifyItem ($item: HTMLElement, markValue: MarkValue) {
    this.marker.mark($item, markValue)
    this.addBaseClassName($item)

    const isMatched = markValue === 'matched'
    if (isMatched) {
      this.blockItemByCurrentMethod($item)
    }
  }

  /** Should revert all changes made to `$item` by `modifyItem()`. */
  private unmodifyItem ($item: HTMLElement) {
    this.marker.unmark($item)

    this.removeAllClassNames($item)
    this.removeBaseClassName($item)
  }

  private tryModify () {
    if (!this.isStarted) return

    const $items = this.selectItems()
    $items
      .filter(($item) => !this.marker.getIsMarked($item))
      .forEach(($item) => {
        const isMatched = this.getIsMatched($item)
        this.modifyItem($item, isMatched ? 'matched' : 'notMatched')
      })
  }

  setBlockMethod (method: BlockMethod) {
    this.method = method
    return this
  }

  setCompanyNamePatterns (patterns: string[]) {
    this.companyNamePatterns = patterns
    return this
  }

  setJobTitlePatterns (patterns: string[]) {
    this.jobTitlePatterns = patterns
    return this
  }

  handleClickItemAction ($item: HTMLElement) {
    emitter.emit(CLICK_ITEM_ACTION, {
      companyName: this.getItemCompanyName($item),
      jobTitle: this.getItemJobTitle($item),
    })
  }

  start () {
    if (this.isStarted) return this

    this.observer = new MutationObserver(() => {
      this.tryModify()
    })
    this.observer.observe(
      document.documentElement,
      { childList: true, subtree: true }
    )
    this.tryModify()

    this.actionActivator = new ActionActivator({
      marker: this.marker,
      onClick: ($item) => { this.handleClickItemAction($item) },
      activatorPositionCallback: this.activatorPositionCallback,
    })
      .start()

    if (this.isDebuggerEnabled) {
      this.blockerDebugger = new BlockerDebugger({
        marker: this.marker,
        getDebuggerInfo: ($item) => ({
          description: this.description,
          jobTitle: this.getItemJobTitle($item),
          companyName: this.getItemCompanyName($item),
        }),
      })
        .start()
    }

    return this
  }

  stop () {
    this.observer?.disconnect()
    this.observer = null

    this.marker.selectMarkedItems()
      .forEach(($item) => { this.unmodifyItem($item) })

    this.actionActivator?.stop()
    this.blockerDebugger?.stop()

    return this
  }

  reload () {
    this.marker.selectMarkedItems()
      .forEach(($item) => { this.unmodifyItem($item) })

    this.tryModify()

    return this
  }

  private isDebuggerEnabled = false

  enableDebugger () {
    this.isDebuggerEnabled = true
  }
}
