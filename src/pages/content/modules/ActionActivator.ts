import { debounce } from 'lodash-es'
import { type Marker } from './Marker'
import { actionActivatorDataKey, renderActivator } from './activator'
import { $$, getIsInViewport } from './dom'
import { emitter, CLICK_ITEM_ACTION } from './emitter'

export type ActivatorPositionCallback = (
  $item: HTMLElement,
  $activator: HTMLElement
) =>({ x: number, y: number })

const dataSetKey = 'taiwan_company_blocker_action_activator_container'

/**
 * @deprecated
 */
export class ActionActivator {
  private readonly $container = document.createElement('div')

  private readonly marker: Marker
  private readonly activatorPositionCallback

  private readonly events = new WeakMap<Element, () => void>()

  constructor (options: {
    marker: Marker
    activatorPositionCallback: ActivatorPositionCallback
  }) {
    this.marker = options.marker
    this.activatorPositionCallback = options.activatorPositionCallback

    this.$container.dataset[dataSetKey] = ''
    this.insertContainer()
  }

  private handleClick ($item: HTMLElement) {
    const markerValue = this.marker.getMarkerValue($item)
    if (!markerValue) return

    emitter.emit(CLICK_ITEM_ACTION, {
      companyName: markerValue.companyName,
      jobTitle: markerValue.jobTitle,
    })
  }

  private async insertContainer () {
    const { $container } = this
    document.body.append($container)

    $container.addEventListener('click', ({ target }) => {
      if (!(target instanceof Element)) return
      const $activator = target.closest(`[data-${actionActivatorDataKey}]`)
      if (!($activator instanceof HTMLElement)) return
      this.events.get($activator)?.()
    })
  }

  private async render ($item: HTMLElement) {
    const isInViewport = getIsInViewport($item)

    if (!isInViewport) return this

    const { $wrapper, $activator } = renderActivator()
    this.$container?.append($wrapper)

    this.events.set($activator, () => { this.handleClick($item) })

    const { x, y } = this.activatorPositionCallback($item, $wrapper)

    Object.assign($wrapper.style, {
      transform: `translate(${x}px, ${y}px)`,
      opacity: 0,
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    Object.assign($wrapper.style, {
      opacity: 1,
      transition: 'opacity .25s',
    })

    return this
  }

  private destroyAll () {
    this.$container.innerHTML = ''
  }

  private handler: (() => void) | null = null
  private observer: MutationObserver | null = null

  start () {
    if (this.handler ?? this.observer) return this

    const debouncedRenderAll = debounce(() => {
      const $items = this.marker.selectMarkedItems()
      $items.forEach(($item) => { this.render($item) })
    }, 250)

    const handler = () => {
      this.destroyAll()
      debouncedRenderAll()
    }
    this.handler = handler

    window.addEventListener('scroll', handler)
    window.addEventListener('resize', handler)

    this.observer = new MutationObserver((records) => {
      const containers = $$(`[data-${dataSetKey}]`)
      const isMutationOutsideContainer = !records.some((record) => (
        containers.some(($container) => $container.contains(record.target))
      ))
      if (!isMutationOutsideContainer) return
      handler()
    })

    this.observer.observe(
      document.documentElement,
      { childList: true, subtree: true }
    )

    handler()

    return this
  }

  stop () {
    if (!this.handler || !this.observer) return

    this.destroyAll()

    window.removeEventListener('scroll', this.handler)
    window.removeEventListener('resize', this.handler)
    this.observer.disconnect()

    this.handler = null
    this.observer = null

    return this
  }
}
