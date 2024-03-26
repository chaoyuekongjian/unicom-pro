import { Request } from '@/utils/request'

// 获取CDM信息
export function fetchList (params: any) {
  return Request.axiosInstance({
      url: '/log',
      method: 'get',
      params
  })
}
