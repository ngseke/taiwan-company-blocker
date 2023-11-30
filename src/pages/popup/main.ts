import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../../styles/tailwind.sass'
import './popup.sass'

const app = createApp(App)

app
  .use(createPinia())
  .mount('#app')
