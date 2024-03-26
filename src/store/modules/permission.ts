import { RouteMeta, RouteRecordRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { toRefs, reactive } from 'vue'
import { constantRoutes, asyncRoutes } from '@/router'

export interface PermissionState {
    routers: Array<RouteRecordRaw>,
    addRouters: Array<RouteRecordRaw>,
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteRecordRaw) {
    if (route.meta && route.meta.role) {
        const temp = route.meta as RouteMeta
        return roles.some(role => {
            return temp.role.includes(role)
        })
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, roles: Array<string>) {
    const res: Array<RouteRecordRaw> = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

export const permissionStore = defineStore('permissionStore', () => {
    const state = reactive<PermissionState>({
        routers: [],
        addRouters: []
    })

    const setRouters = (routers: RouteRecordRaw[]) => {
        state.addRouters = routers
        state.routers = constantRoutes.concat(routers)
    }

    const generateRoutes = (roles: string[]) => {
        return new Promise<RouteRecordRaw[]>(resolve => {
            let accessedRoutes: RouteRecordRaw[]
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            setRouters(accessedRoutes)
            resolve(accessedRoutes)
        })
    }

    const getRouters = (): Array<RouteRecordRaw> => {
        console.log(state.routers)
        return state.routers
    }

    return { ...toRefs(state), setRouters, generateRoutes, getRouters }
})
