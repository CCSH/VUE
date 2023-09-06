import http from '@/utils/http.js'

export const baseUrl = process.env.VUE_APP_BASE_URL

//列表
export function requestList() {
  return http.get(baseUrl + '1.json')
}