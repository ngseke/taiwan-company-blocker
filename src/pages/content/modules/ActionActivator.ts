import { debounce } from 'lodash-es'
import { type Marker } from './Marker'
import { type ActivatorOptions, renderActivator } from './activator'
import { getIsInViewport, waitForElement } from './dom'

export class ActionActivator {
  private readonly $container = document.createElement('div')

  constructor (
    private readonly marker: Marker,
    private readonly onClick: ($item: HTMLElement) => void,
  ) {
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

    const { left, top, width, height } = $item.getBoundingClientRect()

    const {
      width: activatorWidth,
      height: activatorHeight,
    } = $activator.getBoundingClientRect()

    Object.assign($activator.style, {
      transform: `translate(
        calc(${left + width}px - ${activatorWidth}px),
        calc(${top + height}px - ${activatorHeight}px)
      )`,
      opacity: 0,
    })

    await new Promise(resolve => setTimeout(resolve, 0))

    Object.assign($activator.style, {
      opacity: 1,
      transition: 'opacity .25s',
    })

    return this
  }

  private destroyAll () {
    const $activators = [...this.$container.children] as HTMLElement[]

    $activators.forEach(($activator) => {
      Object.assign($activator.style, {
        transition: undefined,
        opacity: 0,
      })

      $activator.addEventListener('transitionend', () => {
        $activator.remove()
      })
    })
  }

  private handler: (() => void) | null = null

  start () {
    if (this.handler) return this

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

    return this
  }

  stop () {
    if (!this.handler) return

    this.destroyAll()

    window.removeEventListener('scroll', this.handler)
    window.removeEventListener('resize', this.handler)

    this.handler = null

    return this
  }
}
