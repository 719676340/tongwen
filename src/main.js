import './assets/reset.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import less from 'less'

import * as echarts from 'echarts'
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(createPinia())
app.use(router)
app.use(less)
app.use(ElementPlus) 
app.mount('#app')
