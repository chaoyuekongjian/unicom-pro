import {createRouter, /*createWebHashHistory,*/ createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'
import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        role: string,
        icon?: string
    }
}

export const constantRoutes: Array<RouteRecordRaw> = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
},{
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
}]

export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: '资源概览',
        component: Layout,
        meta: { role: 'dashboard', icon: 'iconfont icon-ziyuangailan' },
        children: [{
            path: '',
            name: '资源概览',
            component: () => import('@/views/dashboard/index.vue'),
        }]
    },{
        path: '/user-manage',
        name: '用户管理',
        component: Layout,
        meta: { role: 'user-manage', icon: 'iconfont icon-yonghuguanli' },
        children: [{
            path: '',
            name: '用户管理',
            component: () => import('@/views/user-manage/index.vue'),
        }]
    },{
        path: '/operation-log',
        name: '操作日志',
        component: Layout,
        meta: { role: 'operation-log', icon: 'iconfont icon-caozuorizhi' },
        children: [{
            path: '',
            name: '操作日志',
            component: () => import('@/views/operation-log/index.vue'),
        }]
    },{
        path: '/persenal-center',
        name: '用户中心',
        component: Layout,
        children: [{
            path: '',
            name: '用户中心',
            component: () => import('@/views/persenal-center/index.vue'),
        }]
    },
    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', name: '404' }
]

const router = createRouter({
    // scrollBehavior: () => ({ y: 0 }),
    history: createWebHistory(),
    routes: constantRoutes
})

export default router