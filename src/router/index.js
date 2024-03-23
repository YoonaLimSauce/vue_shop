/*
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-11 22:54:47
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-17 16:33:27
 * @FilePath: \vue-shop\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/myLogin.vue'
import Home from '../components/myHome.vue'
import Welcome from '../components/myWelcome.vue'
import Users from '../components/user/myUsers.vue'
import Rights from '../components/power/myRights.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

/* 挂载路由导航守卫 */
router.beforeEach(
  /*  to 代表将要访问的路径
   *  from 代表从哪个路径跳转而来
   *  next 是一个函数，表示放行
   *      next() 直接放行   next('/login')  强制跳转
   */
  (to, from, next) => {
    if (to.path === '/login') {
      return next()
    }
    /* 获取token */
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      return next('/login')
    }
    next()
  }
)

export default router
