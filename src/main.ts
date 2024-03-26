import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import router from '@/router'
import { pinia, registerStore } from '@/store'
import { Request } from '@/utils/request'
import ElementPlus from 'element-plus'
import App from '@/app.vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhLang from 'element-plus/lib/locale/lang/zh-cn'
import locale from '@/assets/locale/cn'

import '@/permission'

import '@/styles/index.scss' // global css
import '@/assets/iconfont/iconfont.css'
import '@/icons'

import SvgIcon from '@/components/SvgIcon/index.vue'// svg component

import moment from 'moment'

const app = createApp(App)
app.use(router)
.use(pinia)
registerStore()

app.use(ElementPlus, {
    locale: { ...zhLang, ...locale }
})
.use(VueAxios, Request.init())
.mount('#app')

app.component('svg-icon', SvgIcon)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$moment = moment
