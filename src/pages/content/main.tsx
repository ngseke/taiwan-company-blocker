import { App } from './App.tsx'

import style from './content.sass?inline'

import { config } from '@fortawesome/fontawesome-svg-core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

config.autoAddCss = false

export async function mountReactApp () {
  const $root = document.createElement('div')
  const $shadow = $root.attachShadow({ mode: 'open' })

  const $style = document.createElement('style')
  $style.innerText = style
  $shadow.append($style)

  const $reactApp = document.createElement('div')
  $reactApp.id = 'tcb-react-app'
  $shadow.append($reactApp)

  createRoot($reactApp).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  document.body.append($root)
}
