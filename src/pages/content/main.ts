import { createApp } from 'vue'
import App from './App.vue'

import style from './content.sass?inline'

import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export async function mountVueApp () {
  const $root = document.createElement('div')
  const $shadow = $root.attachShadow({ mode: 'open' })

  const $style = document.createElement('style')
  $style.innerText = style
  $shadow.append($style)

  const $vueApp = document.createElement('div')
  $vueApp.id = 'tcb-vue-app'
  $shadow.append($vueApp)

  const app = createApp(App)
  app.mount($vueApp)

  document.body.append($root)
}
