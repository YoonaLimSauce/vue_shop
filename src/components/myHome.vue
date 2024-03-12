<!--
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-12 23:36:03
 * @LastEditors: yoonalimsauce miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-13 00:08:09
 * @FilePath: \vue-shop\src\components\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$message.success('退出成功！')
      window.sessionStorage.clear()
      // this.$router.push('/login')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
