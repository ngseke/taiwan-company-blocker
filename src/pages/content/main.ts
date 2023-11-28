import { waitForElement } from './modules/dom'
import { createApp } from 'vue'
import App from './App.vue'

import tailwindStyle from './styles/tailwind.sass?inline'

export async function mountVueApp () {
  const $root = document.createElement('div')
  const $body = await waitForElement('body')
  $body.append($root)

  const $shadow = $root.attachShadow({ mode: 'open' })

  const $style = document.createElement('style')
  $style.innerText = tailwindStyle
  $shadow.append($style)

  const $vueApp = document.createElement('div')
  $shadow.append($vueApp)

  const app = createApp(App)
  app.mount($vueApp)
}