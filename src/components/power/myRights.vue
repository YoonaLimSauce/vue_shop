<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-03-23 09:30:16
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-23 09:38:27
 * @FilePath: \vue_shop\src\components\power\myRights.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>123</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      // 获取权限列表
      const { data: result } = await this.$http.get('/rights/list')
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.message)
      }
      this.rightsList = result.data
    }
  }
}
</script>

<style>

</style>
