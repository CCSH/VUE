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
								<a-input type="number" v-model="paperWidth" style="width: 100px; text: center" placeholder="宽(mm)" />
								<a-input style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff" placeholder="~" disabled />
								<a-input type="number" v-model="paperHeight" style="width: 100px; text: center; border-left: 0" placeholder="高(mm)" />
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
				<a-popconfirm title="是否确认清空?" okType="danger" okText="确定清空" cancelText="取消" @confirm="clearPaper">
					<a-icon slot="icon" type="question-circle-o" style="color: red" />
					<a-button type="danger">
						清空
						<a-icon type="close" />
					</a-button>
				</a-popconfirm>
				<a-button type="primary" icon="save" @click="saveJson">保存模版</a-button>
				<!-- 查看json -->
				<json-view :template="template" />
			</a-space>
			<a-space style="margin-bottom: 10px">
				<a-radio-group style="height: 55px">
					<a-radio-button @click="setElsAlign('left')" title="左对齐">
						<span class="iconfont sv-left"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('vertical')" title="居中">
						<span class="iconfont sv-vertical"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('right')" title="右对齐">
						<span class="iconfont sv-right"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('top')" title="顶部对齐">
						<span class="iconfont sv-top"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('horizontal')" title="垂直居中">
						<span class="iconfont sv-horizontal"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('bottom')" title="底部对齐">
						<span class="iconfont sv-bottom"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('distributeHor')" title="横向分散">
						<span class="iconfont icon-resize-horizontal"></span>
					</a-radio-button>
					<a-radio-button @click="setElsAlign('distributeVer')" title="纵向分散">
						<span class="iconfont icon-resize-vertical"></span>
					</a-radio-button>
				</a-radio-group>
				<!-- 多面板 -->
				<div class="hiprint-printPagination"></div>
			</a-space>
		</div>
		<a-row :gutter="[8, 0]">
			<a-col :span="4">
				<a-card>
					<a-row>
						<a-col :span="24" class="rect-printElement-types hiprintEpContainer">
							<a-row class="drag_item_title">拖拽组件列表</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.text" style>
											<span class="iconfont sv-text" aria-hidden="true"></span>
											<p>文本</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.image" style>
											<span class="iconfont sv-image" aria-hidden="true"></span>
											<p>图片</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.longText">
											<span class="iconfont sv-longText" aria-hidden="true"></span>
											<p>长文</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.emptyTable" style>
											<span class="iconfont sv-table" aria-hidden="true"></span>
											<p>表格</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.html" style="">
											<span class="iconfont sv-html" aria-hidden="true"></span>
											<p>html</p>
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
											<p>横线</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.vline" style>
											<span class="iconfont sv-vline" aria-hidden="true"></span>
											<p>竖线</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.rect">
											<span class="iconfont sv-rect" aria-hidden="true"></span>
											<p>矩形</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.oval">
											<span class="iconfont sv-oval" aria-hidden="true"></span>
											<p>圆形</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.barcode">
											<span class="iconfont sv-barcode" aria-hidden="true"></span>
											<p>条形码</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="defaultModule.qrcode">
											<span class="iconfont sv-qrcode" aria-hidden="true"></span>
											<p>二维码</p>
										</a>
									</div>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="ccshModule.order">
											<span class="iconfont sv-bug" aria-hidden="true"></span>
											<p>ccsh</p>
										</a>
									</div>
								</a-col>
								<a-col :span="12" class="drag_item_box">
									<div>
										<a class="ep-draggable-item" tid="ccshModule.barcode">
											<span class="iconfont sv-barcode" aria-hidden="true"></span>
											<p>条形码2</p>
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
		<printView ref="preView" />
	</a-card>
</template>

<script defer>
import * as vuePluginHiprint from 'vue-plugin-hiprint'
import printData from './static/prin-data'
import jsonView from './print/jsonView.vue'
import printView from './print/printView.vue'
//替换属性
import src from './static/ccsh-src.js'
import fontSize from './static/ccsh-fontSize.js'
//自定义组件
import CcshProvider from './static/ccsh-providers.js'

var hiprint, defaultElementTypeProvider, panel
let hiprintTemplate

export default {
	name: 'printDesign',
	components: { printView, jsonView },
	data() {
		return {
			template: null,
			curPaper: {},
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
			vuePluginHiprint.disAutoConnect()
			defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider

			hiprint = vuePluginHiprint.hiprint
			hiprint.init({
				providers: [new CcshProvider(), new defaultElementTypeProvider()],
				lang: this.$parent.lang,
			})
			//渲染自定义
			// hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'ccshModule')
			// 还原配置
			hiprint.setConfig()
			// 替换配置
			hiprint.setConfig({
				optionItems: [src, fontSize],
			})
			// eslint-disable-next-line no-undef
			hiprint.PrintElementTypeManager.buildByHtml($('.ep-draggable-item'))
			$('#hiprint-printTemplate').empty()
			let that = this
			this.template = hiprintTemplate = new hiprint.PrintTemplate({
				template: panel, //默认信息
				defaultPanelName: '默认面板',
				onPanelAddClick: (panel, createPanel) => {
					panel.name = '新面板' + (panel.index + 1)
					createPanel(panel)
					// this.changeMode()
				},

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
				settingContainer: '#PrintElementOptionSetting', //设置容器
				paginationContainer: '.hiprint-printPagination', //多面板容器
			})
			// 画板 网格线
			hiprintTemplate.design('#hiprint-printTemplate', { grid: true })
			// 获取当前放大比例, 当zoom时传true 才会有
			this.scaleValue = hiprintTemplate.editingPanel.scale || 1

			//纸张大小
			this.paperWidth = panel.panels[0].width
			this.paperHeight = panel.panels[0].height
			this.otherPaper()
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
		clearPaper() {
			try {
				hiprintTemplate.clear()
			} catch (error) {
				this.$message.error(`操作失败: ${error}`)
			}
		},
		saveJson() {
			hiprintTemplate.update(hiprintTemplate.getJson() || {})
		},
		setElsAlign(e) {
			hiprintTemplate.setElsAlign(e)
		},
		//切换拖拽模式
		changeMode() {
			hiprint.init({
				providers: [new CcshProvider()],
			})
			$('.hiprintEpContainer').empty()
			hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'ccshModule')
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
	text: center;
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

//默认图片
/deep/ .hiprint-printElement-image-content {
	img {
		content: url('~@/assets/logo.png');
	}
}

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

//拖拽按钮
.ep-draggable-item {
	color: unset;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: 100%;
}
</style>
