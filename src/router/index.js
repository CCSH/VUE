import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import Page1 from '@/views/Page1.vue'
import Page2 from '@/views/Page2.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  //主路由
  {
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/home',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

export default router
