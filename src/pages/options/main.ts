import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../../styles/tailwind.sass'
import './options.sass'
import { router } from './router'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .mount('#app')
