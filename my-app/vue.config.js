const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost', //本地地址
    port: '8080', //端口号
    hot: true, //热更新自动刷新
    open: true, //自动打开
    // overlay: {
    //   //当出现编译错误或警告时，在浏览器中显示全屏覆盖。只显示错误信息不提示警告情况限制是
    //   warning: false,
    //   error: true,
    // },
    proxy: {
      '/api': {
        target: 'https://gitlab.com', //代理地址
        changeOrigin: true, //允许跨域请求
        secure: false,
        pathRewrire: {
          '^/api': '',
        },
      },
    },
  },
})
