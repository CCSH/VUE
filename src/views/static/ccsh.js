export default (function () {
	function t() {
		this.name = 'src'
	}

	return (
		(t.prototype.createTarget = function (t) {
			this.el = t
			var e = void 0,
				i = this
			this.target = $(
				`<div class="hiprint-option-item hiprint-option-item-row">\n
        <div class="hiprint-option-item-label">\n选择图片\n
        </div>\n
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 0">选择</button>\n
        <input type="text" class="auto-submit" style="display:none">\n
        <input type="file" class="fileBtn" accept="image/*" style="display:none"/>\n
        </div>\n
        </div>`,
			)
			this.target.find('button').click(function () {
				i.target.find('.fileBtn').click()
			})
			this.target.find('.fileBtn').change(function (event) {
				const file = event.target.files[0]
				if (file) {
					// 创建 FileReader 对象
					const reader = new FileReader()
					// 读取文件内容
					reader.readAsDataURL(file)
					// 当文件读取完成时的回调函数
					reader.onload = () => {
						i.refresh(reader.result, {
							// auto: true, // 根据图片宽高自动等比(宽>高?width:height)
							// width: true, // 按宽调整高
							// height: true, // 按高调整宽
							real: true, // 根据图片实际尺寸调整(转pt)
						})
					}
				}
			})
			return this.target
		}),
		(t.prototype.getValue = function () {
			var t = this.target.find('.auto-submit').val()
			if (t) return t.toString()
		}),
		(t.prototype.setValue = function (t) {
			this.target.find('.auto-submit').val(t)
		}),
		(t.prototype.refresh = function (t, opt, cb) {
			var that = this
			this.setValue(t), this.target.find('.auto-submit').change()
			if (this.el && opt) {
				var img = new Image()
				img.src = t
				if (img.complete) {
					that.updateEl(img.width, img.height, opt, cb)
				} else {
					img.onload = function () {
						that.updateEl(img.width, img.height, opt, cb)
					}
				}
			}
		}),
		(t.prototype.updateEl = function (width, height, opt, cb) {
			if (opt) {
				var ratio, w, h
				if (opt && opt.auto) {
					if (width >= height) {
						opt.width = true
					} else {
						opt.height = true
					}
				}
				if (opt.width) {
					ratio = height / width
					w = this.el.options.width
					h = Math.floor(w * ratio * 10) / 10
					this.el.options.height = h
					this.el.designTarget.css('height', h + 'pt')
				} else if (opt.height) {
					ratio = width / height
					h = this.el.options.height
					w = Math.floor(h * ratio * 10) / 10
					this.el.options.width = w
					this.el.designTarget.css('width', w + 'pt')
				} else if (opt.real) {
					w = hinnn.px.toPt(width)
					h = hinnn.px.toPt(height)
					this.el.options.width = w
					this.el.options.height = h
					this.el.designTarget.css('width', w + 'pt')
					this.el.designTarget.css('height', h + 'pt')
				}
				this.el.designTarget.children('.resize-panel').trigger($.Event('click'))
			}
			cb && cb(this.el, width, height)
		}),
		(t.prototype.destroy = function () {
			this.target.remove()
		}),
		t
	)
})()
