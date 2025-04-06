import { ActionActivator2 } from './ActionActivator2'
import { actionActivatorDataKey } from './activator'
import { overlayDataKey } from './overlay'

export function createSafeMutationObserver (callback: MutationCallback): MutationObserver {
  const observer = new MutationObserver((mutations, ...rest) => {
    const shouldSkip = mutations.some((mutation) => (
      [...mutation.addedNodes, ...mutation.removedNodes].some((node) => {
        if (!(node instanceof HTMLElement)) return false
        return (
          actionActivatorDataKey in node.dataset ||
          overlayDataKey in node.dataset ||
          ActionActivator2.dataSetKey in node.dataset ||
          node.closest(`[data-${ActionActivator2.dataSetKey}]`)
        )
      })
    ))

    if (shouldSkip) return
    callback(mutations, ...rest)
  })

  return observer
}
