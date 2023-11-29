import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom'

export function htmlToElement (html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild as HTMLElement
}

export function $ (selector: string) {
  return querySelectorDeep(selector)
}

export function $$ (selector: string) {
  return [...querySelectorAllDeep(selector)]
}

export function $x (xpath: string) {
  const snapshot = document.evaluate(
    xpath, document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  )
  return [...Array(snapshot.snapshotLength)]
    .map((_, i) => snapshot.snapshotItem(i) as HTMLElement)
}

export function getIsInViewport (element: HTMLElement) {
  if (!element || element.style.display === 'none') {
    return false
  }

  const boundingClientRect = element.getBoundingClientRect()
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth)

  const isVerticallyInView = (boundingClientRect.top <= windowHeight) && ((boundingClientRect.top + boundingClientRect.height) >= 0)
  const isHorizontallyInView = (boundingClientRect.left <= windowWidth) && ((boundingClientRect.left + boundingClientRect.width) >= 0)

  return (isVerticallyInView && isHorizontallyInView)
}

export async function waitForElement (selector: string): Promise<HTMLElement> {
  return await new Promise(resolve => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element as HTMLElement)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)

      if (element) {
        resolve(element as HTMLElement)
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
  })
}
