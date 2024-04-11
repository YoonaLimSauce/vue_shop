/*
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-11 22:54:47
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-11 22:27:43
 * @FilePath: \vue-shop\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TreeTable from 'vue-table-with-tree-grid'
import './plugins/element.js'

/* 导入全局样式表 */
import './assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont/iconfont.css'
/* 导入axios */
import axios from 'axios'
/* 导入quill-editor富文本编辑器 */
import VueQuillEditor from 'vue-quill-editor'
/* 导入富文本编辑器对应的样式 */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/* 配置请求的根路径 */
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    /* 在最后必须 return config */
    return config
  }
)
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(originDataValue) {
  const dateTime = new Date(originDataValue)

  const year = dateTime.getFullYear()
  const month = (dateTime.getMonth() + 1 + '').padStart(2, '0')
  const day = (dateTime.getDate() + '').padStart(2, '0')

  const hour = (dateTime.getHours() + '').padStart(2, '0')
  const minute = (dateTime.getMinutes() + '').padStart(2, '0')
  const second = (dateTime.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
