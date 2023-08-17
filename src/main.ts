import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// 导入svg插件
import 'virtual:svg-icons-register'
import pinia from './stores'
// 引入vant样式  在main.scss之前导入
import 'vant/lib/index.css'
// 引入全局样式
import './styles/main.scss'

window._AMapSecurityConfig = {
  securityJsCode: '415e917da833efcf2d5b69f4d821784b'
}

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
