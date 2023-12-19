import { debounce } from 'lodash-es'
import { type Marker } from './Marker'
import { type ActivatorOptions, renderActivator } from './activator'
import { $$, getIsInViewport, waitForElement } from './dom'
import { type Nullish } from '../../../types/Nullish'

export type ActivatorPositionCallback = (
  $item: HTMLElement,
  $activator: HTMLElement
) =>({ x: number, y: number })

/** Returns the bottom right corner of `$item`. */
export const defaultActivatorPositionCallback: ActivatorPositionCallback =
  ($item, $activator) => {
    const { left, top, width, height } = $item.getBoundingClientRect()
    const {
      width: activatorWidth,
      height: activatorHeight,
    } = $activator.getBoundingClientRect()

    return {
      x: left + width - activatorWidth,
      y: top + height - activatorHeight,
    }
  }

const dataSetKey = 'taiwan_company_blocker_action_activator_container'

export class ActionActivator {
  private readonly $container = document.createElement('div')

  private readonly marker: Marker
  private readonly onClick: ($item: HTMLElement) => void
  private readonly activatorPositionCallback = defaultActivatorPositionCallback

  constructor (options: {
    marker: Marker
    onClick: ($item: HTMLElement) => void
    activatorPositionCallback?: Nullish<ActivatorPositionCallback>
  }) {
    this.marker = options.marker
    this.onClick = options.onClick
    if (options.activatorPositionCallback) {
      this.activatorPositionCallback = options.activatorPositionCallback
    }
    this.$container.dataset[dataSetKey] = ''
    this.insertContainer()
  }

  private async insertContainer () {
    const $body = await waitForElement('body')
    $body.append(this.$container)
  }

  private async render ($item: HTMLElement, options: ActivatorOptions) {
    const isInViewport = getIsInViewport($item)

    if (!isInViewport) return this

    const $activator = renderActivator(options)
    this.$container?.append($activator)

    const { x, y } = this.activatorPositionCallback($item, $activator)

    Object.assign($activator.style, {
      transform: `translate(${x}px, ${y}px)`,
      opacity: 0,
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    Object.assign($activator.style, {
      opacity: 1,
      transition: 'opacity .25s',
    })

    return this
  }

  private destroyAll () {
    const $activators = [...this.$container.children]

    $activators.forEach(($activator) => {
      $activator.remove()
    })
  }

  private handler: (() => void) | null = null
  private observer: MutationObserver | null = null

  start () {
    if (this.handler ?? this.observer) return this

    const debouncedRenderAll = debounce(() => {
      const $items = this.marker.selectMarkedItems()
      $items.forEach(($item) => {
        this.render($item, {
          onClick: () => { this.onClick($item) },
        })
      })
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
