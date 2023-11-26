import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom'

export function htmlToElement (html: string) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild as HTMLElement
}

export function $ (selector: string) {
  const element = querySelectorDeep(selector)
  if (!element) throw new Error(`Failed to select \`${selector}\``)

  return element
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
