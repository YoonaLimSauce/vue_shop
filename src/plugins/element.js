/*
 * @Author: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-03-13 22:00:29
 * @LastEditors: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-16 00:36:40
 * @FilePath: \vue_shop\src\plugins\element.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message,
  Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItem, MenuItemGroup
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message = Message
