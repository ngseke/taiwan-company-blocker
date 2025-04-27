import { createHashRouter, Navigate } from 'react-router'
import { Layout } from './Layout'
import { AboutPage } from './pages/AboutPage'
import { SettingPage } from './pages/SettingPage'
import { DatabasePage } from './pages/DatabasePage'
import { SubscriptionPage } from './pages/SubscriptionPage'

export const router = createHashRouter([
  {
    path: '/',
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: () => <Navigate replace to="setting" /> },

          { path: 'setting', Component: SettingPage },
          { path: 'subscription', Component: SubscriptionPage },
          { path: 'database', Component: DatabasePage },
          { path: 'about', Component: AboutPage },
        ],
      },
    ],
  },
])
