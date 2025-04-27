import '../../styles/tailwind.sass'
import './options.sass'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router'

createRoot(document.getElementById('app') as Element).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
