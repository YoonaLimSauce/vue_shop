/*
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-11 22:54:47
 * @LastEditors: yoonalimsauce miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-12 20:52:26
 * @FilePath: \vue-shop\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

/* 导入全局样式表 */
import './assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
