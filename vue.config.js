const { defineConfig } = require('@vue/cli-service')
const chalk = require('chalk')

module.exports = defineConfig({
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	// 开启文件名哈希
	filenameHashing: true,
	//生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	transpileDependencies: true,
	//是否在保存时进行eslint
	lintOnSave: false,
	devServer: {
		// 跨域
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: process.env.VUE_APP_BASE_URL, //目标地址
				changeOrigin: true, //是否跨域
				// ws: false, //是否启用websockets
				// secure: false, //是否启用https
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: '',
				},
				timeout: 20 * 60 * 1000,
			},
		},
	},
	chainWebpack: config => {
		// 提示输出的哪个地址
		console.log(chalk.yellowBright(process.env.VUE_APP_BASE_URL + ' please wait... \n'))
		// 判断不同环境 做相应处理
		// if (process.env.VUE_APP_BASE_URL.includes('dev')) {
		// 	// 测试生产环境, 不压缩js代码
		// 	config.optimization.minimize(false)
		// }
		//set第一个参数：设置的别名，第二个参数：设置的路径
		// config.resolve.alias.set('@', resolve('./src')).set('components', resolve('./src/components')).set('assets', resolve('./src/assets')).set('views', resolve('./src/views')).set('network', resolve('./src/network'))
		//注意 store 和 router 没必要配置

		// config.plugin('html').tap(args => {
		// 	args[0].title = 'CCSH管理平台'
		// 	return args
		// })
	},
})
