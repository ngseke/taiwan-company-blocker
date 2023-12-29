import { createApp } from 'vue'
import App from './App.vue'

import style from './content.sass?inline'

export async function mountVueApp () {
  const $root = document.createElement('div')
  const $shadow = $root.attachShadow({ mode: 'open' })

  const $style = document.createElement('style')
  $style.innerText = style
  $shadow.append($style)

  const $vueApp = document.createElement('div')
  $shadow.append($vueApp)

  const app = createApp(App)
  app.mount($vueApp)

  document.body.append($root)
}
