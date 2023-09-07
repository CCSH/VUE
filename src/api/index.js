import http from '@/utils/http.js'

export const baseUrl = process.env.VUE_APP_BASE_URL
export const hostUrl = process.env.VUE_APP_BASE_API + '/xxx/'

//列表
export function requestList() {
	return http.get(hostUrl + 'list.json')
}
