import { createApp } from 'vue'
import { registerPlugins } from '../../modules/plugins'
import App from './App.vue'
import '../../styles/tailwind.sass'
import './options.sass'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
