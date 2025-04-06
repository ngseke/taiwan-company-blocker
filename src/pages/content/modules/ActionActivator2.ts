import { renderActivator } from './activator'
import { getIsInViewport } from './dom'
import { emitter, CLICK_ITEM_ACTION } from './emitter'
import { type Candidate } from './Candidate'
import { type ActivatorPositionStrategy, type Position } from './CreateBlockerOptions'
import { debounce } from 'lodash-es'
import { renderOverlay } from './overlay'
import { createSafeMutationObserver } from './createSafeMutationObserver'

export type ActivatorPositionCallback = (
  $item: HTMLElement,
  $activator: HTMLElement
) =>({ x: number, y: number })

function activatorPositionCallback (
  $item: HTMLElement,
  $activator: HTMLElement,
  activatorPosition: ActivatorPositionStrategy | Position
) {
  const { left, top, width, height } = $item.getBoundingClientRect()
  const { width: activatorWidth, height: activatorHeight } = $activator.getBoundingClientRect()

  let position: Position
  let [offsetX, offsetY] = [0, 0]

  if (typeof activatorPosition === 'string') {
    position = activatorPosition
  } else {
    position = activatorPosition.position
    offsetX = activatorPosition.offset?.[0] ?? 0
    offsetY = activatorPosition.offset?.[1] ?? 0
  }

  const offsetLeft = left + offsetX
  const offsetRight = left + width - activatorWidth - offsetX
  const offsetTop = top + offsetY
  const offsetBottom = top + height - activatorHeight - offsetY

  const positionMap: Record<Position, { x: number, y: number }> = {
    'top-left': { x: offsetLeft, y: offsetTop },
    'top-right': { x: offsetRight, y: offsetTop },
    'bottom-left': { x: offsetLeft, y: offsetBottom },
    'bottom-right': { x: offsetRight, y: offsetBottom },
  }

  return positionMap[position]
}
export class ActionActivator2 {
  static dataSetKey = 'tcb_action_activator_container'

  private readonly $container = document.createElement('div')
  private readonly $overlay = renderOverlay()

  constructor () {
    const { $container, $overlay } = this

    $container.dataset[ActionActivator2.dataSetKey] = ''
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
      const offset = 8
      Object.assign(this.$overlay.style, {
        opacity: 1,
        transition: 'all .15s',
        left: `${$item.getBoundingClientRect().left - offset}px`,
        top: `${$item.getBoundingClientRect().top - offset}px`,
        width: `${$item.getBoundingClientRect().width + offset * 2}px`,
        height: `${$item.getBoundingClientRect().height + offset * 2}px`,
      })
    })

    $activator.addEventListener('mouseleave', () => {
      this.hideOverlay()
    })

    const { x, y } = activatorPositionCallback(
      $item,
      $wrapper,
      options.activatorPosition ?? 'top-right'
    )

    Object.assign($wrapper.style, {
      transform: `translate(${x}px, ${y}px)`,
      opacity: 0,
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    Object.assign($wrapper.style, {
      opacity: 1,
      transition: 'opacity .1s',
    })

    return this
  }

  private hideOverlay () {
    Object.assign(this.$overlay.style, {
      opacity: 0,
      transition: 'all .3s',
    })
  }

  private destroyAll () {
    this.$container.innerHTML = ''
    this.hideOverlay()
  }

  private handler: (() => void) | null = null
  private observer: MutationObserver | null = null

  start (candidates: Candidate[]) {
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

    window.addEventListener('scroll', handler)
    window.addEventListener('resize', handler)

    this.observer = createSafeMutationObserver(handler)
    this.observer.observe(document.body, { childList: true, subtree: true })

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
