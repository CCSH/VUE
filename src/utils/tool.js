import Vue from 'vue'
//全局方法
Vue.mixin({
	methods: {
		// 获取显示名字（value => label）
		displayName(value, arr) {
			if (arr && arr.length > 0) {
				const item = arr.find(v => v.value == value)
				return item ? item.label : value
			}
			return value
		},
		//字符串限制
		strRegular(e, type) {
			let pattern = ''
			switch (type) {
				case 1:
					//去除 特殊符号
					pattern = /[^0-9A-Za-z|，。；‘’“”：\u4e00-\u9fa5]*/g
					break
				case 2:
					//只有 数字和英文字符
					pattern = /[^\w_]/g
					break
				case 3:
					//只有 数字
					pattern = /[^\d]/g
					break
				case 4:
					//只有 数字和点
					pattern = /[^\d+(,\d\d\d)*.-\d+$]/g
					break
				case 5:
					//去除 汉字
					pattern = /[\u4E00-\u9FA5]/g
					break
				case 6:
					//价格
					return e.replace(/\D*(\d*)(\.?)(\d{0,2})\d*/,'$1$2$3').replace(/^0+(\d)/, '$1').match(/^\d*(\.?\d{0,2})/g)[0] || ''
					break
			}
			return e.replace(pattern, '')
		},
	},
})
