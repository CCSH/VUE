export default {
	panels: [
		{
			index: 0,
			name: '默认面板',
			height: 40,
			width: 80,
			paperHeader: 0,
			paperFooter: 109.49999999999999,
			printElements: [
				{ options: { left: 7.5, top: 4.5, height: 13.5, width: 199.5, title: '商品名称', testData: '123', coordinateSync: false, widthHeightSync: false, fontSize: 12, fontWeight: 'bolder', color: '#000000', qrCodeLevel: 0, right: 207, bottom: 17.25, vCenter: 107.25, hCenter: 10.5, field: 'title' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 9, top: 26.25, height: 18, width: 118.5, title: ' ', testData: '¥48.00', coordinateSync: false, widthHeightSync: false, fontSize: 18, fontWeight: 'bolder', qrCodeLevel: 0, right: 127.5, bottom: 43.5, vCenter: 68.25, hCenter: 34.5, field: 'amount', hideTitle: true, color: '#000000' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 154.5, top: 25.5, height: 60, width: 60, title: '二维码', qrcodeType: 'qrcode', testData: 'qrcode', right: 213.75, bottom: 84.75, vCenter: 183.75, hCenter: 54.75, coordinateSync: false, widthHeightSync: false, field: 'qrCode', hideTitle: true }, printElementType: { title: '二维码', type: 'qrcode' } },
				{ options: { left: 7.5, top: 52.5, height: 9.75, width: 120, title: '产地', coordinateSync: false, widthHeightSync: false, qrCodeLevel: 0, right: 124.5, bottom: 59.25, vCenter: 64.5, hCenter: 54.375, field: 'description', testData: '哈尔滨' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 7.5, top: 70.5, height: 33, width: 130.5, field: 'barCode', testData: 'XS888888888', fontSize: 10, lineHeight: 18, textAlign: 'center', textType: 'barcode', title: '条形码', right: 137.25, bottom: 102.75, vCenter: 72, hCenter: 86.25, coordinateSync: false, widthHeightSync: false, hideTitle: true, qrCodeLevel: 0 }, printElementType: { title: '条形码', type: 'text' } },
			],
			paperNumberLeft: 186,
			paperNumberTop: 90,
			paperNumberDisabled: true,
			paperNumberContinue: true,
			watermarkOptions: { content: 'CCSH', rotate: 25, timestamp: true, format: 'YYYY-MM-DD HH:mm', fillStyle: 'rgba(184, 184, 184, 0.3)', fontSize: '14px', width: 200, height: 200 },
		},
	],
}
