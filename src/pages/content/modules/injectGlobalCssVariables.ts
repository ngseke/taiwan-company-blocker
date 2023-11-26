import icon from '../../../assets/img/icon.png'
import { htmlToElement } from './dom'

export function injectGlobalCssVariables () {
  const css = `
    :root {
      --taiwan-company-blocker-icon: url(${chrome.runtime.getURL(icon)});
    }
  `
  const $style = htmlToElement(`<style>${css}</style>`)
  document.head.appendChild($style)
}
