import { htmlToElement } from './dom'
import style from './overlay.module.sass'

export const overlayDataKey = 'tcb_overlay'

export function renderOverlay () {
  const $element = htmlToElement(`
    <div class="${style.overlay}" data-${overlayDataKey}>
    </div>
  `)

  return $element
}
