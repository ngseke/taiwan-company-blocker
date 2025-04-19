import { createRouter, createWebHashHistory } from 'vue-router'
import Setting from './views/Setting.vue'
import Subscription from './views/Subscription.vue'
import About from './views/About.vue'
import Database from './views/Database.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/setting' },

    { path: '/setting', component: Setting },
    { path: '/subscription', component: Subscription },
    { path: '/database', component: Database },
    { path: '/about', component: About },
  ],
})
