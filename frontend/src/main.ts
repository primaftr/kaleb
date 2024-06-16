import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  QueryClient as VueQueryClient,
  VueQueryPlugin,
  VueQueryPluginOptions
} from '@tanstack/vue-query'

import './assets/tailwind.css'
import App from './App.vue'
import router from './router'
import { setupAxiosInterceptor } from './utils/axios'

setupAxiosInterceptor()
const app = createApp(App)

const vueQueryClient = new VueQueryClient()
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: vueQueryClient
}

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
