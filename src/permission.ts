import router from '@/router'
import appStore from '@/store'
import { ElMessage } from 'element-plus'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { map } from 'lodash'

const whiteList:Array<string> = ['/login', '/auth-redirect']


router.beforeEach(async (to, from, next) => {
    const { roles, token, getInfo, resetToken } = appStore.userStore
    const { changeRouter } = appStore.routerStore
    const { generateRoutes } = appStore.permissionStore

    document.title = '联通云运营管理平台'

    NProgress.start()
    if (!!token) {
        if (to.path === '/login' || to.path === '/') {
            changeRouter('/dashboard')
            next('/dashboard')
        } else {
            const hasRoles = roles && roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await getInfo()

                    const accessRoutes = await generateRoutes(roles)
                    map(accessRoutes, d => {
                        router.addRoute(d)
                    })

                    next({ ...to, replace: true })
                } catch (e) {
                    resetToken()
                    ElMessage({
                        type: 'error',
                        message: 'Has Error'
                    })
                    next()
                    // next(`/login`)
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('login')
        }
        // if (to.path === '/login') {
        //     next()
        // } else {
        //     next(`/login`)
        // }
    }
    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
