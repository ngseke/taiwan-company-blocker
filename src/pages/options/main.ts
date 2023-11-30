import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../../styles/tailwind.sass'
import './options.sass'

const app = createApp(App)

app
  .use(createPinia())
  .mount('#app')
