import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import hljs from 'highlight.js'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'
import 'element-plus/dist/index.css'
import router from './router'

createApp(App)
  .use(router)
  .use(hljsVuePlugin, { hljs })
  .use(ElementPlus)
  .use(createPinia())
  .mount('#app')
