import { hiprint } from 'vue-plugin-hiprint'

export default function (options) {
	var addElementTypes = function (context) {
		// 移除 旧的 defaultModule "元素"类型, 以避免重复
		context.removePrintElementTypes('ccshModule')
		// 添加 defaultModule "元素"类型
		context.addPrintElementTypes('ccshModule', [
			// PrintElementTypeGroup 分组
			// 如果使用 hiprint.PrintElementTypeManager.build('.hiprintEpContainer2', "ccshModule") 这里会渲染这个 "自定义" 分组名称
			new hiprint.PrintElementTypeGroup('自定义', [
				{
					tid: 'ccshModule.order', // 唯一 key
					type: 'text', // 元素类型
					title: '订单号',
					options: {
						field: 'orderId', // 字段名称
						testData: 'xxxxxx', // 测试数据
					},
				},
				{
					tid: 'ccshModule.order2', // 唯一 key
					type: 'text', // 元素类型
					title: '订单号2',
					options: {
						field: 'orderId2', // 字段名称
						testData: 'xxxxxx', // 测试数据
					},
				},
				{
					tid: 'ccshModule.barcode',
					title: '条形码',
					data: 'XS888888888',
					type: 'text',
					options: {
						field: 'barcode',
						testData: 'XS888888888',
						height: 32,
						fontSize: 12,
						lineHeight: 18,
						textAlign: 'center',
						textType: 'barcode',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('平台', [
				{
					tid: 'ccshModule.header',
					title: '单据表头',
					data: '单据表头',
					type: 'text',
					options: {
						testData: '单据表头',
						height: 17,
						fontSize: 16.5,
						field: 'headera',
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{
					tid: 'ccshModule.type',
					title: '单据类型',
					data: '单据类型',
					type: 'text',
					options: {
						testData: '单据类型',
						height: 16,
						fontSize: 15,
						field: 'textType',
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{
					tid: 'ccshModule.order',
					title: '订单编号',
					data: 'XS888888888',
					type: 'text',
					options: {
						field: 'orderId',
						testData: 'XS888888888',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'ccshModule.date',
					title: '业务日期',
					data: '2020-01-01',
					type: 'text',
					options: {
						field: 'date',
						testData: '2020-01-01',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'ccshModule.barcode',
					title: '条形码',
					data: 'XS888888888',
					type: 'text',
					options: {
						field: 'barcode',
						testData: 'XS888888888',
						height: 32,
						fontSize: 12,
						lineHeight: 18,
						textType: 'barcode',
					},
				},
				{
					tid: 'ccshModule.qrcode',
					title: '二维码',
					data: 'XS888888888',
					type: 'text',
					options: {
						field: 'qrcode',
						testData: 'XS888888888',
						height: 32,
						fontSize: 12,
						lineHeight: 18,
						textType: 'qrcode',
					},
				},
				{
					tid: 'ccshModule.platform',
					title: '平台名称',
					data: '平台名称',
					type: 'text',
					options: {
						testData: '平台名称',
						height: 17,
						fontSize: 16.5,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{ tid: 'ccshModule.logo', title: 'Logo', data: '', type: 'image' },
			]),
			new hiprint.PrintElementTypeGroup('库管', [
				{
					tid: 'ccshModule.creater',
					title: '制单人',
					data: '李四',
					type: 'text',
					options: {
						field: 'creater',
						testData: '李四',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'ccshModule.printDate',
					title: '打印时间',
					data: '2022-01-01 09:00',
					type: 'text',
					options: {
						field: 'printDate',
						testData: '2022-01-01 09:00',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'ccshModule.signer',
					title: '库管签字',
					data: '',
					type: 'text',
					options: {
						title: '库管签字：',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('表格/其他', [
				{
					tid: 'ccshModule.table',
					title: '订单数据',
					type: 'table',
					options: {
						field: 'table',
						tableHeaderRepeat: 'first',
						tableFooterRepeat: 'last',
						fields: [
							{ text: '名称', field: 'NAME' },
							{ text: '数量', field: 'SL' },
							{ text: '规格', field: 'GG' },
							{ text: '条码', field: 'TM' },
							{ text: '单价', field: 'DJ' },
							{ text: '金额', field: 'JE' },
						],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					isEnableEditField: true, //编辑字段
					isEnableContextMenu: true, //开启右键菜单 默认true
					isEnableInsertRow: true, //插入行
					isEnableDeleteRow: true, //删除行
					isEnableInsertColumn: true, //插入列
					isEnableDeleteColumn: true, //删除列
					isEnableMergeCell: true, //合并单元格
					columns: [
						[
							{ title: '名称', align: 'center', field: 'NAME', width: 150 },
							{ title: '数量', align: 'center', field: 'SL', width: 80 },
							{ title: '规格', align: 'center', field: 'GG', width: 80, checked: false },
							{ title: '条码', align: 'center', field: 'TM', width: 100, checked: false },
							{ title: '单价', align: 'center', field: 'DJ', width: 100 },
							{ title: '金额', align: 'center', field: 'JE', width: 100, checked: false },
						],
					],
					rowsColumnsMerge: function (data, col, index) {
						// 返回一个数组,参数一为行（rowspan）合并数,参数二为列（colspan）合并数, 被合并的行或者列值设为0
						if (index == 0) {
							return [1, data.INDEX % 2 == 1 ? 2 : 1]
						} else if (index > 0 && index < 2) {
							return [data.INDEX % 2 == 1 ? 0 : 1, 1]
						} else {
							return [data.INDEX % 2 == 1 ? 2 : 0, 1]
						}
					},
					footerFormatter: function (options, rows, data, currentPageGridRowsData) {
						if (data && data['totalCap']) {
							return `<td style="padding:0 10px" colspan="100">${'应收金额大写: ' + data['totalCap']}</td>`
						}
						return '<td style="padding:0 10px" colspan="100">应收金额大写: </td>'
					},
				},
				{ tid: 'ccshModule.customText', title: '文本', customText: '自定义文本', custom: true, type: 'text' },
				{
					tid: 'ccshModule.longText',
					title: '长文本',
					type: 'longText',
					options: {
						field: 'test.longText',
						width: 200,
						testData: '长文本分页/不分页测试',
					},
				},
			]),
		])
	}
	return {
		addElementTypes,
	}
}
