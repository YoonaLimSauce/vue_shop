<!--
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-12 23:36:03
 * @LastEditors: 林允儿 Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-16 01:27:08
 * @FilePath: \vue-shop\src\components\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 这里是首页的布局 -->
  <el-container class="home-container">
    <!-- 这里是首页的头部-->
    <el-header>
      <!-- 这里是首页的头部内容-->
      <div>
        <img src="../assets/heima.png" alt="logo">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">
        退出
      </el-button>
    </el-header>
    <!-- 这里是首页的主体-->
    <el-container>
      <!-- 这里是首页的侧边栏-->
      <el-aside width="200px">
        <!-- 这里是首页的侧边栏内容-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域-->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文字 -->
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1-4-1">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文字 -->
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
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
  data() {
    return {
      // 侧边栏菜单数据
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      this.$message.success('退出成功！')
      window.sessionStorage.clear()
      // this.$router.push('/login')
      this.$router.replace('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取菜单列表失败！')
      this.menuList = res.data
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
