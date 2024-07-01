<template>
	<a-card style="calc(100vh-300px)">
		<div style="display: flex; flex-direction: column; overflow: auto">
			<a-space style="margin-bottom: 10px">
				<a-button-group>
					<template v-for="(value, type) in paperTypes">
						<a-button :type="curPaperType === type ? 'primary' : 'info'" @click="setPaper(type, value)" :key="type">
							{{ type }}
						</a-button>
					</template>
					<a-popover v-model="paperPopVisible" title="设置纸张宽高(mm)" trigger="click">
						<div slot="content">
							<a-input-group compact style="margin: 10px 10px">
								<a-input type="number" v-model="paperWidth" style="width: 100px; text-align: center" placeholder="宽(mm)" />
								<a-input style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff" placeholder="~" disabled />
								<a-input type="number" v-model="paperHeight" style="width: 100px; text-align: center; border-left: 0" placeholder="高(mm)" />
							</a-input-group>
							<a-button type="primary" style="width: 100%" @click="otherPaper">确定</a-button>
						</div>
						<a-button :type="'other' == curPaperType ? 'primary' : ''">自定义纸张</a-button>
					</a-popover>
				</a-button-group>
				<a-button type="text" icon="zoom-out" @click="changeScale(false)"></a-button>
				<a-input-number :value="scaleValue" :min="scaleMin" :max="scaleMax" :step="0.1" disabled style="width: 70px" :formatter="value => `${(value * 100).toFixed(0)}%`" :parser="value => value.replace('%', '')" />
				<a-button type="text" icon="zoom-in" @click="changeScale(true)"></a-button>
				<a-button type="primary" icon="eye" @click="preView">预览</a-button>
				<a-popconfirm title="是否确认清空?" okType="danger" okText="确定清空" @confirm="clearPaper">
					<a-icon slot="icon" type="question-circle-o" style="color: red" />
					<a-button type="danger">
						清空
						<a-icon type="close" />
					</a-button>
				</a-popconfirm>
				<json-view :template="template" />
			</a-space>
			<a-space style="margin-bottom: 10px">
				<a-textarea style="width: 25vw" v-model="jsonIn" @pressEnter="updateJson" placeholder="复制json模板到此后 点击右侧更新" allow-clear />
				<a-button type="primary" @click="updateJson">更新json模板</a-button>
				<a-button type="primary" @click="exportJson">导出json模板到 textArea</a-button>
				<a-textarea style="width: 25vw" v-model="jsonOut" placeholder="点击左侧导出json" allow-clear />
			</a-space>
		</div>
		<a-row :gutter="[8, 0]">
			<a-col :span="4">
				<a-card style="height: 100vh">
					<a-row>
						<a-col :span="24" class="rect-printElement-types hiprintEpContainer">
							<a-row class="drag_item_title">拖拽组件列表</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.text" style>
											<span class="iconfont sv-text" aria-hidden="true"></span>
											<p class="glyphicon-class">文本</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.image" style>
											<span class="iconfont sv-image" aria-hidden="true"></span>
											<p class="glyphicon-class">图片</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.longText">
											<span class="iconfont sv-longText" aria-hidden="true"></span>
											<p class="glyphicon-class">长文</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.emptyTable" style>
											<span class="iconfont sv-table" aria-hidden="true"></span>
											<p class="glyphicon-class">表格</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.html" style="">
											<span class="iconfont sv-html" aria-hidden="true"></span>
											<p class="glyphicon-class">html</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row class="drag_item_title">辅助</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.hline" style>
											<span class="iconfont sv-hline" aria-hidden="true"></span>
											<p class="glyphicon-class">横线</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.vline" style>
											<span class="iconfont sv-vline" aria-hidden="true"></span>
											<p class="glyphicon-class">竖线</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.rect">
											<span class="iconfont sv-rect" aria-hidden="true"></span>
											<p class="glyphicon-class">矩形</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.oval">
											<span class="iconfont sv-oval" aria-hidden="true"></span>
											<p class="glyphicon-class">圆形</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row v-if="currVerInfo.verVal >= 55.3">
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.barcode">
											<span class="iconfont sv-barcode" aria-hidden="true"></span>
											<p class="glyphicon-class">条形码</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.qrcode">
											<span class="iconfont sv-qrcode" aria-hidden="true"></span>
											<p class="glyphicon-class">二维码</p>
										</a>
									</div>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-card>
			</a-col>
			<a-col :span="15">
				<a-card class="card-design">
					<div id="hiprint-printTemplate" class="hiprint-printTemplate"></div>
				</a-card>
			</a-col>
			<a-col :span="5" class="params_setting_container">
				<a-card>
					<a-row class="hinnn-layout-sider">
						<div id="PrintElementOptionSetting"></div>
					</a-row>
				</a-card>
			</a-col>
		</a-row>
		<!-- 预览 -->
		<print-preview ref="preView" />
	</a-card>
</template>

<script defer>
import * as vuePluginHiprint from 'vue-plugin-hiprint'
import printData from './static/print-data'
import src from './static/ccsh.js'
import printPreview from './print/preView.vue'
import jsonView from './print/jsonView.vue'

var hiprint, defaultElementTypeProvider, panel
let hiprintTemplate

export default {
	name: 'printDesign',
	components: { printPreview, jsonView },
	data() {
		return {
			template: null,
			curPaper: {
				type: 'A4',
				width: 210,
				height: 296.6,
			},
			paperTypes: {
				A3: {
					width: 420,
					height: 296.6,
				},
				A4: {
					width: 210,
					height: 296.6,
				},
				A5: {
					width: 210,
					height: 147.6,
				},
				B3: {
					width: 500,
					height: 352.6,
				},
				B4: {
					width: 250,
					height: 352.6,
				},
				B5: {
					width: 250,
					height: 175.6,
				},
			},
			// 自定义纸张
			paperPopVisible: false,
			paperWidth: '220',
			paperHeight: '80',
			// 缩放
			scaleValue: 1,
			scaleMax: 5,
			scaleMin: 0.5,
			// 导入导出json
			jsonIn: '',
			jsonOut: '',
		}
	},
	computed: {
		curPaperType() {
			let type = 'other'
			let types = this.paperTypes
			for (const key in types) {
				let item = types[key]
				let { width, height } = this.curPaper
				if (item.width === width && item.height === height) {
					type = key
				}
			}
			return type
		},
		/**
		 * @description: 当前版本信息，用于 demo 页面根据版本控制功能
		 * @return {Object}
		 */
		currVerInfo() {
			return {
				verVal: 9999,
			}
		},
	},
	mounted() {
		this.getPanel()
		this.init()
	},
	methods: {
		/**
		 * @description: 加载 panel
		 */
		getPanel() {
			// 加载所有 panel
			const panels = require.context('./', true, /panel.*\.js$/)
			panel = panels('./static/panel.js').default
		},

		init() {
			hiprint = vuePluginHiprint.hiprint
			defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider
			vuePluginHiprint.disAutoConnect()
			hiprint.init({
				providers: [new defaultElementTypeProvider()],
				lang: this.$parent.lang,
			})
			// 还原配置
			hiprint.setConfig()
			// 替换配置
			hiprint.setConfig({
				optionItems: [src],
			})
			// eslint-disable-next-line no-undef
			hiprint.PrintElementTypeManager.buildByHtml($('.ep-draggable-item'))
			$('#hiprint-printTemplate').empty()
			let that = this
			this.template = hiprintTemplate = new hiprint.PrintTemplate({
				template: panel,
				// // 图片选择功能
				// onImageChooseClick: (target, src) => {
				// 	console.log('onImageChooseClick', target, src)
				// 	target.refresh(src, {
				// 		// auto: true, // 根据图片宽高自动等比(宽>高?width:height)
				// 		// width: true, // 按宽调整高
				// 		// height: true, // 按高调整宽
				// 		real: true, // 根据图片实际尺寸调整(转pt)
				// 	})
				// },
				// 自定义可选字体
				// 或者使用 hiprintTemplate.setFontList([])
				// 或元素中 options.fontList: []
				fontList: [
					{ title: '微软雅黑', value: 'Microsoft YaHei' },
					{ title: '黑体', value: 'STHeitiSC-Light' },
					{ title: '思源黑体', value: 'SourceHanSansCN-Normal' },
					{ title: '王羲之书法体', value: '王羲之书法体' },
					{ title: '宋体', value: 'SimSun' },
					{ title: '华为楷体', value: 'STKaiti' },
					{ title: 'cursive', value: 'cursive' },
				],
				dataMode: 1, // 1:getJson 其他：getJsonTid 默认1
				history: true, // 是否需要 撤销重做功能
				willOutOfBounds: true, // 是否允许组件内的控件超出范围
				qtDesigner: true, // 是否开启类似QT Designer的唯一field生成模式
				onDataChanged: (type, json) => {
					console.log(type) // 新增、移动、删除、修改(参数调整)、大小、旋转
					console.log(json) // 返回 template
				},
				onUpdateError: e => {
					console.log(e)
				},
				settingContainer: '#PrintElementOptionSetting',
				paginationContainer: '.hiprint-printPagination',
			})
			//网格线
			hiprintTemplate.design('#hiprint-printTemplate', { grid: true })
			console.log(hiprintTemplate)
			// 获取当前放大比例, 当zoom时传true 才会有
			this.scaleValue = hiprintTemplate.editingPanel.scale || 1
		},
		/**
		 * 设置纸张大小
		 * @param type [A3, A4, A5, B3, B4, B5, other]
		 * @param value {width,height} mm
		 */
		setPaper(type, value) {
			try {
				if (Object.keys(this.paperTypes).includes(type)) {
					this.curPaper = { type: type, width: value.width, height: value.height }
					hiprintTemplate.setPaper(value.width, value.height)
				} else {
					this.curPaper = { type: 'other', width: value.width, height: value.height }
					hiprintTemplate.setPaper(value.width, value.height)
				}
			} catch (error) {
				this.$message.error(`操作失败: ${error}`)
			}
		},
		otherPaper() {
			let value = {}
			value.width = this.paperWidth
			value.height = this.paperHeight
			this.paperPopVisible = false
			this.setPaper('other', value)
		},
		changeScale(big) {
			let scaleValue = this.scaleValue
			if (big) {
				scaleValue += 0.1
				if (scaleValue > this.scaleMax) scaleValue = 5
			} else {
				scaleValue -= 0.1
				if (scaleValue < this.scaleMin) scaleValue = 0.5
			}
			if (hiprintTemplate) {
				// scaleValue: 放大缩小值, false: 不保存(不传也一样), 如果传 true, 打印时也会放大
				hiprintTemplate.zoom(scaleValue)
				this.scaleValue = scaleValue
			}
		},
		rotatePaper() {
			if (hiprintTemplate) {
				hiprintTemplate.rotatePaper()
			}
		},
		preView() {
			// 测试, 点预览更新拖拽元素
			hiprint.updateElementType('defaultModule.text', type => {
				type.title = '这是更新后的元素'
				return type
			})
			// 测试, 通过socket刷新打印机列表； 默认只有连接的时候才会获取到最新的打印机列表
			hiprint.refreshPrinterList(list => {
				console.log('refreshPrinterList')
				console.log(list)
			})
			// 测试, 获取IP、IPV6、MAC地址、DNS
			// 参数格式：
			// 1. 类型（ip、ipv6、mac、dns、all、interface、vboxnet）
			// 2. 回调 data => {addr, e}  addr: 返回的数据 e:错误信息
			// 3. 其他参数 ...args
			hiprint.getAddress('ip', data => {
				console.log('ip')
				console.log(data)
			})
			hiprint.getAddress('ipv6', data => {
				console.log('ipv6')
				console.log(data)
			})
			hiprint.getAddress('mac', data => {
				console.log('mac')
				console.log(data)
			})
			hiprint.getAddress('dns', data => {
				console.log('dns')
				console.log(data)
			})
			hiprint.getAddress('all', data => {
				console.log('all')
				console.log(data)
			})
			// 各个平台不一样, 用法见: https://www.npmjs.com/package/address
			hiprint.getAddress(
				'interface',
				data => {
					console.log('interface')
					console.log(data)
				},
				'IPv4',
				'eth1',
			)
			this.$refs.preView.show(hiprintTemplate, printData)
		},
		onlyPrint() {
			let hiprintTemplate = this.$print(
				undefined,
				panel,
				printData,
				{},
				{
					styleHandler: () => {
						let css = '<link href="http://hiprint.io/Content/hiprint/css/print-lock.css" media="print" rel="stylesheet">'
						return css
					},
				},
			)
			console.log(hiprintTemplate)
		},
		onlyPrint2() {
			let that = this
			if (window.hiwebSocket.opened) {
				let hiprintTemplate = this.$print2(undefined, panel, printData, {
					printer: '',
					title: 'Api单独打印',
					styleHandler: () => {
						// let css = '<link href="http://hiprint.io/Content/hiprint/css/print-lock.css" media="print" rel="stylesheet">';
						let css = '<style>.hiprint-printElement-text{color:red !important;}</style>'
						return css
					},
				})
				let key = 'Api单独直接打印'
				hiprintTemplate.on('printSuccess', function () {
					that.$notification.success({
						key: key,
						placement: 'topRight',
						message: key + ' 打印成功',
						description: 'Api单独直接打印回调',
					})
				})
				return
			}
			this.$error({
				title: '客户端未连接',
				content: h => (
					<div>
						连接【{hiwebSocket.host}】失败！
						<br />
						请确保目标服务器已
						<a href="https://gitee.com/CcSimple/electron-hiprint/releases" target="_blank">
							下载
						</a>
						并
						<a href="hiprint://" target="_blank">
							运行
						</a>
						打印服务！
					</div>
				),
			})
		},
		print() {
			if (window.hiwebSocket.opened) {
				const printerList = hiprintTemplate.getPrinterList()
				console.log(printerList)
				hiprintTemplate.print2(printData, { printer: '', title: 'hiprint测试打印' })
				return
			}
			this.$error({
				title: '客户端未连接',
				content: h => (
					<div>
						连接【{hiwebSocket.host}】失败！
						<br />
						请确保目标服务器已
						<a href="https://gitee.com/CcSimple/electron-hiprint/releases" target="_blank">
							下载
						</a>
						并
						<a href="hiprint://" target="_blank">
							运行
						</a>
						打印服务！
					</div>
				),
			})
		},
		clearPaper() {
			try {
				hiprintTemplate.clear()
			} catch (error) {
				this.$message.error(`操作失败: ${error}`)
			}
		},
		exportPdf(type) {
			hiprintTemplate.toPdf(printData, '测试导出pdf', { isDownload: false, type: type }).then(res => {
				console.log('type:', type)
				console.log(res)
			})
		},
		ippPrintAttr() {
			// 不知道打印机 ipp 情况， 可通过 '客户端' 获取一下
			const printerList = hiprintTemplate.getPrinterList()
			console.log(printerList)
			if (!printerList.length) return
			let p = printerList[0]
			console.log(p)
			// 系统不同， 参数可能不同
			let url = p.options['printer-uri-supported']
			// 测试 获取 ipp打印 支持参数
			hiprint.ippPrint(
				{
					url: url,
					// 打印机参数： {version,uri,charset,language}
					opt: {},
					action: 'Get-Printer-Attributes', // 获取打印机支持参数
					// ipp参数
					message: null,
				},
				res => {
					// 执行的ipp 任务回调 / 错误回调
					console.log(res)
				},
				printer => {
					// ipp连接成功 回调 打印机信息
					console.log(printer)
				},
			)
		},
		ippPrintTest() {
			// 不知道打印机 ipp 情况， 可通过 '客户端' 获取一下
			const printerList = hiprintTemplate.getPrinterList()
			console.log(printerList)
			if (!printerList.length) return
			let p = printerList[0]
			console.log(p)
			// 系统不同， 参数可能不同
			let url = p.options['printer-uri-supported']
			// 测试 打印文本
			hiprint.ippPrint(
				{
					url: url,
					// 打印机参数： {version,uri,charset,language}
					opt: {},
					action: 'Print-Job',
					// ipp参数
					message: {
						'operation-attributes-tag': {
							'requesting-user-name': 'hiPrint', // 用户名
							'job-name': 'ipp Test Job', // 任务名
							'document-format': 'text/plain', // 文档类型
						},
						// data 需为 Buffer (客户端简单处理了string 转 Buffer), 支持设置 encoding
						// data 需为 Buffer (客户端简单处理了string 转 Buffer), 支持设置 encoding
						// data 需为 Buffer (客户端简单处理了string 转 Buffer), 支持设置 encoding
						// 其他 Uint8Array/ArrayBuffer   默认仅 使用 Buffer.from(data)
						// 其他 Uint8Array/ArrayBuffer   默认仅 使用 Buffer.from(data)
						// 其他 Uint8Array/ArrayBuffer   默认仅 使用 Buffer.from(data)
						// 其他 Uint8Array/ArrayBuffer   默认仅 使用 Buffer.from(data)
						data: 'test test test test test test test',
						encoding: 'utf-8', // 默认可不传
					},
				},
				res => {
					// 执行的ipp 任务回调 / 错误回调
					console.log(res)
				},
				printer => {
					// ipp连接成功 回调 打印机信息
					console.log(printer)
				},
			)
		},
		// 自定义 ipp 请求
		ippRequestTest() {
			const printerList = hiprintTemplate.getPrinterList()
			console.log(printerList)
			if (!printerList.length) return
			let p = printerList[0]
			console.log(p)
			// 系统不同， 参数可能不同
			let url = p.options['printer-uri-supported']
			// 详见： https://www.npmjs.com/package/ipp
			hiprint.ippRequest(
				{
					url: url,
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					data: {
						operation: 'Get-Printer-Attributes',
						'operation-attributes-tag': {
							// 测试发现 Request下列3个必须要有
							'attributes-charset': 'utf-8',
							'attributes-natural-language': 'zh-cn',
							'printer-uri': url,
						},
					},
				},
				res => {
					// 执行的ipp 任务回调 / 错误回调
					console.log(res)
				},
			)
		},
		ippRequestPrint() {
			const printerList = hiprintTemplate.getPrinterList()
			console.log(printerList)
			if (!printerList.length) return
			let p = printerList[0]
			console.log(p)
			// 系统不同， 参数可能不同
			let url = p.options['printer-uri-supported']
			let str = 'ippRequestPrint ippRequestPrint ippRequestPrint'
			let array = new Uint8Array(str.length)
			for (var i = 0; i < str.length; i++) {
				array[i] = str.charCodeAt(i)
			}
			let testData = array.buffer
			// 详见： https://www.npmjs.com/package/ipp
			hiprint.ippRequest(
				{
					url: url,
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					// 传入的数据 ipp.serialize 后 未做任何处理  打印内容 需要 Buffer
					data: {
						operation: 'Print-Job',
						'operation-attributes-tag': {
							// 测试发现 Request下列3个必须要有
							'attributes-charset': 'utf-8',
							'attributes-natural-language': 'zh-cn',
							'printer-uri': url,
							'requesting-user-name': 'hiPrint', // 用户名
							'job-name': 'ipp Request Job', // 任务名
							'document-format': 'text/plain', // 文档类型
						},
						data: testData,
					},
				},
				res => {
					// 执行的ipp 任务回调 / 错误回调
					console.log(res)
				},
			)
		},
		updateJson() {
			if (hiprintTemplate) {
				try {
					hiprintTemplate.update(JSON.parse(this.jsonIn))
				} catch (e) {
					this.$message.error(`更新失败: ${e}`)
				}
			}
		},
		exportJson() {
			if (hiprintTemplate) {
				this.jsonOut = JSON.stringify(hiprintTemplate.getJson() || {})
			}
		},
		setElsAlign(e) {
			hiprintTemplate.setElsAlign(e)
		},
		setElsSpace(h) {
			hiprintTemplate.setElsSpace(10, h)
		},
		getSelectEls() {
			let els = hiprintTemplate.getSelectEls()
			console.log(els)
		},
		updateFontSize() {
			hiprintTemplate.updateOption('fontSize', 12)
		},
		updateFontWeight() {
			hiprintTemplate.updateOption('fontWeight', 'bolder')
		},
	},
}
</script>

<style lang="scss" scoped>
@import './print/hiprint.css';
/deep/.ant-card-body {
	overflow: auto;
	height: calc(100vh - 186px);
}
// 拖拽
.drag_item_box {
	height: 100px;
	padding: 6px;
}

.drag_item_box > div {
	height: 100%;
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
}

.drag_item_box > div > a {
	text-align: center;
	text-decoration-line: none;
}

.drag_item_box > div > a > span {
	font-size: 28px;
}

.drag_item_box > div > a > p {
	margin: 0;
}

.drag_item_title {
	font-size: 16px;
	padding: 12px 6px 0 6px;
	font-weight: bold;
}

// 默认图片
// /deep/ .hiprint-printElement-image-content {
// 	img {
// 		content: url('~@/assets/logo.png');
// 	}
// }

// 辅助线样式
/deep/ .toplineOfPosition {
	border: 0;
	border-top: 1px dashed purple;
}

/deep/ .bottomlineOfPosition {
	border: 0;
	border-top: 1px dashed purple;
}

/deep/ .leftlineOfPosition {
	border: 0;
	border-left: 1px dashed purple;
}

/deep/ .rightlineOfPosition {
	border: 0;
	border-left: 1px dashed purple;
}

// 设计容器
.card-design {
	overflow: hidden;
	overflow-x: auto;
	overflow-y: auto;
}
</style>
