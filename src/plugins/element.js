/*
 * @Author: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-03-13 22:00:29
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-31 17:38:10
 * @FilePath: \vue_shop\src\plugins\element.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Tag, Tree, Select, Option, Cascader, Alert,
  Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItem, MenuItemGroup,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, TabPane, Tabs,
  Switch, Tooltip, Pagination, Dialog, MessageBox, Steps, Step, CheckboxGroup, Checkbox
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
