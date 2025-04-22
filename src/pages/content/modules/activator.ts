import { htmlToElement } from './dom'
import style from './action-activator.module.sass'

export const actionActivatorDataKey = 'tcb_action_activator'

export function renderActivator () {
  const $wrapper = htmlToElement(`
    <div class="${style['activator-wrapper']}" data-${actionActivatorDataKey}>
      <button
        type="button"
        class="${style.activator}"
        title="封鎖"
      >
        <svg shape-rendering="geometricPrecision" width="20" height="20" viewBox="0 0 512 512" style="fill: currentColor;"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
      </button>
    </div>
  `)
  const $activator = $wrapper.querySelector('button')
  if (!$activator) throw new Error('Failed to select activator')

  return { $wrapper, $activator }
}
