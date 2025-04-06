import { ActionActivatorFixed } from './ActionActivatorFixed'
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
          ActionActivatorFixed.dataSetKey in node.dataset ||
          node.closest(`[data-${ActionActivatorFixed.dataSetKey}]`)
        )
      })
    ))

    if (shouldSkip) return
    callback(mutations, ...rest)
  })

  return observer
}
