import { renderActivator } from './activator'
import { getIsInViewport } from './dom'
import { emitter, CLICK_ITEM_ACTION } from './emitter'
import { type Candidate } from './Candidate'
import { debounce } from 'lodash-es'
import { renderOverlay } from './overlay'
import { createSafeMutationObserver } from './createSafeMutationObserver'
import { loadIsDebuggerEnabled } from '../../../modules/storage'
import { getActivatorPositionFixed } from './getActivatorPositionFixed'

export type ActivatorPositionCallback = (
  $item: HTMLElement,
  $activator: HTMLElement
) =>({ x: number, y: number })

export class ActionActivatorFixed {
  static dataSetKey = 'tcb_action_activator_container'

  private readonly $container = document.createElement('div')
  private readonly $overlay = renderOverlay()
  private isDebuggerEnabled = false

  constructor () {
    const { $container, $overlay } = this

    $container.dataset[ActionActivatorFixed.dataSetKey] = ''
    document.body.append($container)

    document.body.append($overlay)
  }

  private async render (candidate: Candidate) {
    const { itemElementRef, options } = candidate
    const $item = itemElementRef.deref()
    if (!$item) return this

    const isInViewport = getIsInViewport($item)
    if (!isInViewport) return this

    const { $wrapper, $activator } = renderActivator()
    this.$container?.append($wrapper)
    $activator.addEventListener('click', () => {
      emitter.emit(CLICK_ITEM_ACTION, candidate)
    })

    $activator.addEventListener('mouseenter', () => {
      const offset = 4
      Object.assign(this.$overlay.style, {
        opacity: 1,
        transition: 'opacity .1s',
        left: `${$item.getBoundingClientRect().left - offset}px`,
        top: `${$item.getBoundingClientRect().top - offset}px`,
        width: `${$item.getBoundingClientRect().width + offset * 2}px`,
        height: `${$item.getBoundingClientRect().height + offset * 2}px`,
      })

      if (this.isDebuggerEnabled) {
        // eslint-disable-next-line no-console -- for debugger
        console.info(candidate)
      }
    })

    $activator.addEventListener('mouseleave', () => {
      this.hideOverlay()
    })

    const { x, y } = getActivatorPositionFixed(
      $item,
      $wrapper,
      options.activatorPosition ?? 'top-right'
    )

    Object.assign($wrapper.style, {
      transform: `translate(${x}px, ${y}px)`,
      top: 0,
      left: 0,
      opacity: 0,
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    Object.assign($wrapper.style, {
      opacity: 1,
      transition: 'opacity .1s',
    })
  }

  private hideOverlay () {
    Object.assign(this.$overlay.style, {
      opacity: 0,
      transition: 'all .2s',
    })
  }

  private destroyAll () {
    this.$container.innerHTML = ''
    this.hideOverlay()
  }

  private handler: (() => void) | null = null
  private observer: MutationObserver | null = null

  async start (candidates: Candidate[]) {
    this.stop()

    const debouncedRenderAll = debounce(() => {
      candidates.forEach((candidate) => {
        this.render(candidate)
      })
    }, 250)

    const handler = () => {
      this.destroyAll()
      debouncedRenderAll()
    }
    this.handler = handler
    handler()

    window.addEventListener('scroll', handler)
    window.addEventListener('resize', handler)

    this.observer = createSafeMutationObserver(handler)
    this.observer.observe(document.body, { childList: true, subtree: true })

    this.isDebuggerEnabled = await loadIsDebuggerEnabled()
  }

  stop () {
    if (!this.handler || !this.observer) return

    this.destroyAll()

    window.removeEventListener('scroll', this.handler)
    window.removeEventListener('resize', this.handler)
    this.observer.disconnect()

    this.handler = null
    this.observer = null
  }
}
