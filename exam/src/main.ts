import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
import './assets/iconfont/iconfont.css' //字体图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import router from './router/index'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
createApp(App).use(router).use(ElementPlus).mount('#app')
