/*
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-11 22:54:47
 * @LastEditors: yoonalimsauce miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-12 21:02:52
 * @FilePath: \vue-shop\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/myLogin.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
