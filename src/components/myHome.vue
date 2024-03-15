<!--
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-12 23:36:03
 * @LastEditors: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-15 23:42:28
 * @FilePath: \vue-shop\src\components\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 这里是首页的布局 -->
  <el-container class="home-container">
    <!-- 这里是首页的头部-->
    <el-header>
      <!-- 这里是首页的头部内容-->
      Header
      <el-button type="info" @click="logout">
        退出
      </el-button>
    </el-header>
    <!-- 这里是首页的主体-->
    <el-container>
      <!-- 这里是首页的侧边栏-->
      <el-aside width="200px">
        <!-- 这里是首页的侧边栏内容-->
        Aside
      </el-aside>
      <el-main>
        <!-- 这里是首页的主要内容-->
        Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$message.success('退出成功！')
      window.sessionStorage.clear()
      // this.$router.push('/login')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  } 
  .el-header {
    background-color: #373D41;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
