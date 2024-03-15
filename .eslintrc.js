/*
 * @Author: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-03-13 22:00:29
 * @LastEditors: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-16 00:29:52
 * @FilePath: \Git\vue_shop\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // root: true,
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    "linebreak-style": [0 ,"error", "windows"]
  }
}
