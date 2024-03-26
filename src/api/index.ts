import { Request } from '@/utils/request'

// 获取CDM信息
export function fetchCDMs (params: any) {
    return Request.axiosInstance({
        url: '/cdm',
        method: 'get',
        params
    })
}

// 用户列表
export function fetchUserList (params: any) {
    return Request.axiosInstance({
        url: '/tenant',
        method: 'get',
        params
    })
}

// 创建用户
export function createUser (data: any) {
    return Request.axiosInstance({
        url: '/tenant',
        method: 'post',
        data
    })
}

// 编辑用户
export function editUser (data: any, userId: string,) {
    return Request.axiosInstance({
        url: `/tenant/${userId}`,
        method: 'put',
        data
    })
}

// 容量调整
export function editStorage (data: any, userId: string,) {
    return Request.axiosInstance({
        url: `/tenant/${userId}/storage`,
        method: 'put',
        data
    })
}

// 容量调整
export function editTime (data: any, userId: string,) {
    return Request.axiosInstance({
        url: `/tenant/${userId}/time`,
        method: 'put',
        data
    })
}

// 删除用户
export function deleteUser (userId: string) {
    return Request.axiosInstance({
        url: `/tenant/${userId}`,
        method: 'delete'
    })
}

// 登录
export function login (data: any) {
    return Request.axiosInstance({
        url: '/login',
        method: 'post',
        data
    })
}

// 修改密码
export function changePassword (data: any) {
    return Request.axiosInstance({
        url: '/user/password',
        method: 'put',
        data
    })
}

// 获取头像
export function fetchAvatar () {
    return Request.axiosInstance({
        url: `/user/profile`,
        method: 'get',
    })
}

// 操作日志
export function fetchOperationLog (params: any) {
    return Request.axiosInstance({
        url: '/log',
        method: 'get',
        params
    })
}

// 获取告警阈值信息
export function fetchThreshold() {
    return Request.axiosInstance({
        url: '/settings/alarm',
        method: 'get'
    })
}

// 获取告警阈值信息
export function setThreshold(data: any) {
    return Request.axiosInstance({
        url: '/settings/alarm',
        method: 'post',
        data
    })
}