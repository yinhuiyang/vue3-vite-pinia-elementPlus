import {
    createApp
} from 'vue'
import router from './router'
import App from './App.vue'
import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'

import piniaPluginPersist from 'pinia-plugin-persist'
import {
    createPinia
} from 'pinia'
import {
    registerStore
} from '@/store'
import '@/styles/index.scss' // 公共样式
import '../permission'


const app = createApp(App)
Object.keys(icons).forEach((key) => {
    app.component(key, icons[key])
})

const pinia = createPinia()
// pinia数据持久化
createPinia().use(piniaPluginPersist)
// // 自定义指令全局注册
// import * as directive from "./directive"
// Object.keys(directive).forEach(key => {
//     app.directive(key, directive[key]);
// })

app.use(router)
app.use(pinia)
app.use(ElementPlus)
registerStore()
app.mount('#app')