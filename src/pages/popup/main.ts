import { createApp } from 'vue'
import { registerPlugins } from '../../modules/plugins'
import App from './App.vue'
import '../../styles/tailwind.sass'
import './popup.sass'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
