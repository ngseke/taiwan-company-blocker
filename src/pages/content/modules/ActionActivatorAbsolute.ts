import { actionActivatorDataKey, renderActivator } from './activator'
import { $$ } from './dom'
import { emitter, CLICK_ITEM_ACTION } from './emitter'
import { type Candidate } from './Candidate'
import { renderOverlay } from './overlay'
import { loadIsDebuggerEnabled } from '../../../modules/storage'
import { getActivatorPositionAbsoluteStyle } from './getActivatorPositionAbsoluteStyles'

export class ActionActivatorAbsolute {
  private readonly $overlay = renderOverlay()
  private isDebuggerEnabled = false

  constructor () {
    const { $overlay } = this

    document.body.append($overlay)
  }

  private async render (candidate: Candidate) {
    const { itemElementRef, options } = candidate
    const $item = itemElementRef.deref()
    if (!$item) return

    const { $wrapper, $activator } = renderActivator()
    Object.assign($wrapper.style, {
      position: 'absolute',
    })
    $item?.append($wrapper)
    $activator.addEventListener('click', (event) => {
      event.stopPropagation()
      event.preventDefault()
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

    Object.assign($wrapper.style, getActivatorPositionAbsoluteStyle(
      options.activatorPosition ?? 'top-right'
    ))
  }

  private hideOverlay () {
    Object.assign(this.$overlay.style, {
      opacity: 0,
      transition: 'all .2s',
    })
  }

  private destroyAll () {
    $$(`[data-${actionActivatorDataKey}]`).forEach(($wrapper) => {
      $wrapper.remove()
    })
    this.hideOverlay()
  }

  async start (candidates: Candidate[]) {
    this.stop()
    this.destroyAll()
    candidates.forEach((candidate) => {
      this.render(candidate)
    })

    this.isDebuggerEnabled = await loadIsDebuggerEnabled()
  }

  stop () {
    this.destroyAll()
  }
}
