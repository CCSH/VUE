import http from '@/utils/http.js'

const baseUrl = 'api'

//列表
export function requestList() {
  return http.get(baseUrl + '/list.json')
}

//表单
export function requestForm() {
  return http.get(baseUrl + '/form.json')
}