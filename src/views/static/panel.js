export default {
	panels: [
		{
			index: 0,
			name: 1,
			height: 40,
			width: 76,
			paperHeader: 49.5,
			paperFooter: 105.05050505050504,
			printElements: [
				{ options: { left: 7.5, top: 4.5, height: 13.5, width: 199.5, title: '商品名称', testData: '123', coordinateSync: false, widthHeightSync: false, fontSize: 12, fontWeight: 'bolder', color: '#000000', qrCodeLevel: 0, right: 207, bottom: 17.25, vCenter: 107.25, hCenter: 10.5, field: 'title' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 147, top: 22.5, height: 60, width: 60, title: '二维码', qrcodeType: 'qrcode', testData: '', right: 206.25, bottom: 82.5, vCenter: 176.25, hCenter: 52.5, coordinateSync: false, widthHeightSync: false, field: 'qrCode', hideTitle: true }, printElementType: { title: '二维码', type: 'qrcode' } },
				{ options: { left: 9, top: 25.5, height: 18, width: 118.5, title: ' ', testData: '¥48.00', coordinateSync: false, widthHeightSync: false, fontSize: 18, fontWeight: 'bolder', qrCodeLevel: 0, right: 127.5, bottom: 43.5, vCenter: 68.25, hCenter: 34.5, field: 'amount', hideTitle: true, color: '#000000' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 7.5, top: 51, height: 9.75, width: 120, title: '产地', coordinateSync: false, widthHeightSync: false, qrCodeLevel: 0, right: 124.5, bottom: 59.25, vCenter: 64.5, hCenter: 54.375, field: 'description', testData: '哈尔滨' }, printElementType: { title: '文本', type: 'text' } },
				{ options: { left: 7.5, top: 73.5, height: 24, width: 130.5, title: ' ', barcodeType: 'code128', testData: 'barcode', right: 138.75, bottom: 96.75, vCenter: 73.5, hCenter: 84.75, coordinateSync: false, widthHeightSync: false, field: 'barCode', hideTitle: true }, printElementType: { title: '条形码', type: 'barcode' } },
			],
			paperNumberLeft: 186,
			paperNumberTop: 90,
			paperNumberDisabled: true,
			paperNumberContinue: true,
			watermarkOptions: { content: 'CCSH', rotate: 25, timestamp: true, format: 'YYYY-MM-DD HH:mm', fillStyle: 'rgba(184, 184, 184, 0.3)', fontSize: '14px', width: 200, height: 200 },
		},
	],
}
