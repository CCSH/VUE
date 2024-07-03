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
				{ options: { left: 154.5, top: 25.5, height: 60, width: 60, title: '二维码', qrcodeType: 'qrcode', testData: 'qrcode', right: 213.75, bottom: 84.75, vCenter: 183.75, hCenter: 54.75, coordinateSync: false, widthHeightSync: false, field: 'qrCode', hideTitle: true }, printElementType: { title: '二维码', type: 'qrcode' } },
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
		{
			index: 1,
			name: '新面板2',
			paperType: 'A4',
			height: 297,
			width: 210,
			paperHeader: 0,
			paperFooter: 841.8897637795277,
			printElements: [
				{ options: { left: 0, top: 0, height: 1, width: 1, formatter: 'function(t, e, printData) {\n                var script = document.createElement("script");\n                script.setAttribute("type", "text/javascript");\n                script.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js");\n                return script;\n            }' }, printElementType: { title: 'Echarts依赖', type: 'html' } },
				{
					options: {
						left: 12,
						top: 12,
						height: 200,
						width: 200,
						formatter:
							"function(t, e, printData) {\n                if (window.echarts) {\n                    var echartDom = document.createElement(\"div\");\n                    echartDom.style.width = \"267px\";\n                    echartDom.style.height = \"267px\";\n                    var echartInstance = echarts.init(echartDom,null,{renderer: \"svg\"})\n                    echartInstance.setOption({\n                        animation: false,\n                        grid: {\n                            top: 10,\n                            right: 20,\n                            bottom: 30,\n                            left: 36,\n                        },\n                        xAxis: {\n                            type: 'category',\n                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n                        },\n                        yAxis: {\n                            type: 'value'\n                        },\n                        series: [\n                            {\n                                data: printData?.lineData || [150, 230, 224, 218, 135, 147, 260],\n                                type: 'line'\n                            }\n                        ]\n                    })\n                    return echartDom;\n                } else {\n                    return '<div style=\"width: 267px;height: 267px; border: 1px solid;\">点击打印预览查看</div>'\n                }\n            }",
					},
					printElementType: { title: 'html', type: 'html' },
				},
				{
					options: {
						left: 230,
						top: 12,
						height: 200,
						width: 200,
						formatter:
							"function(t, e, printData) {\n                  if (window.echarts) {\n                      var echartDom = document.createElement(\"div\");\n                      echartDom.style.width = \"267px\";\n                      echartDom.style.height = \"267px\";\n                      var echartInstance = echarts.init(echartDom,null,{renderer: \"svg\"})\n                      echartInstance.setOption({\n                          animation: false,\n                          grid: {\n                              top: 10,\n                              right: 20,\n                              bottom: 30,\n                              left: 36,\n                          },\n                          xAxis: {\n                              type: 'category',\n                              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n                          },\n                          yAxis: {\n                              type: 'value'\n                          },\n                          series: [\n                              {\n                                  data: printData?.barData || [150, 230, 224, 218, 135, 147, 260],\n                                  type: 'bar'\n                              }\n                          ]\n                      })\n                      return echartDom;\n                  } else {\n                      return '<div style=\"width: 267px;height: 267px; border: 1px solid;\">点击打印预览查看</div>'\n                  }\n                }",
					},
					printElementType: { title: 'html', type: 'html' },
				},
				{
					options: {
						left: 12,
						top: 229.5,
						height: 200,
						width: 200,
						formatter:
							"function(t, e, printData) {\n                  if (window.echarts) {\n                      var echartDom = document.createElement(\"div\");\n                      echartDom.style.width = \"267px\";\n                      echartDom.style.height = \"267px\";\n                      var echartInstance = echarts.init(echartDom,null,{renderer: \"svg\"})\n                      echartInstance.setOption({\n                          animation: false,\n                          series: [\n                              {\n                                  name: 'Access From',\n                                  type: 'pie',\n                                  radius: ['40%', '70%'],\n                                  avoidLabelOverlap: false,\n                                  itemStyle: {\n                                      borderRadius: 10,\n                                      borderColor: '#fff',\n                                      borderWidth: 2\n                                  },\n                                  label: {\n                                      show: false,\n                                      position: 'center'\n                                  },\n                                  emphasis: {\n                                      label: {\n                                          show: true,\n                                          fontSize: 40,\n                                          fontWeight: 'bold'\n                                      }\n                                  },\n                                  labelLine: {\n                                      show: false\n                                  },\n                                  data: printData?.pieData || [\n                                      { value: 1048, name: 'Search Engine' },\n                                      { value: 735, name: 'Direct' },\n                                      { value: 580, name: 'Email' },\n                                      { value: 484, name: 'Union Ads' },\n                                      { value: 300, name: 'Video Ads' }\n                                  ]\n                              }\n                          ]\n                        })\n                      return echartDom;\n                  } else {\n                      return '<div style=\"width: 267px;height: 267px; border: 1px solid;\">点击打印预览查看</div>'\n                  }\n                }",
						right: 211.25,
						bottom: 429.5,
						vCenter: 111.25,
						hCenter: 329.5,
					},
					printElementType: { title: 'html', type: 'html' },
				},
				{ options: { left: 12, top: 460, height: 12, width: 418, title: '说明：此处模版以一个不可见 html 元素加载 echarts ，故第一次打开无法显示预览，但后续的 print api 能够正常显示，你可以在你的项目中全局加载 echarts 依赖，保证设计、预览时能加载到 echarts 依赖，即可删除用于引入依赖的html元素。使用 print2 需要在 electron-hiprint 项目渲染层中添加该依赖，否则客户端首次打印都无法正常渲染 echarts' }, printElementType: { title: '说明', type: 'text' } },
			],
			paperNumberContinue: true,
			watermarkOptions: {},
		},
	],
}
