import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/tailwind.sass'
import './popup.sass'
import { App } from './App'

createRoot(document.getElementById('app') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
