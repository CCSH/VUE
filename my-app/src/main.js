import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import Cookie from 'js-cookie'

//全局引入
Vue.use(ElementUI)

Vue.config.productionTip = false

//添加全局守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    //未登录 不在登录页面 跳转登录
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    //登录了 去登录页面 跳转首页
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    //重新处理路由
    store.commit('handleRouter', router)
  },
}).$mount('#app')
