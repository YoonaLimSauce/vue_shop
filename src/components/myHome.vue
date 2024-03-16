<!--
 * @Author: yoonalimsauce miraclefishleong@gmail.com
 * @Date: 2024-03-12 23:36:03
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-17 00:42:47
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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 这里是首页的侧边栏内容-->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
        background-color="#333744" text-color="#fff" active-text-color="#409eff"
        :unique-opened="true" :collapse="isCollapse" :collapse-transition="false"
        :router="true">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id.toString()" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域-->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文字 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.path.toString()" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 这里是首页的主要内容-->
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 侧边栏菜单数据
      menuList: [],
      iconsObj: {},
      isCollapse: false
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
      if (res.meta.status !== 200) {
        return this.$message.error('获取菜单列表失败！')
      }
      this.menuList = res.data
      console.log(res.data[0])
      debugger
      const iconsList = ['user', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
      for (let i = 0; i < res.data.length; ++i) {
        this.iconsObj[res.data[i].id] = 'iconfont icon-' + iconsList[i]
      }
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
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
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #4a5064;
    height: 24px;
    font-size: 16px;
    color: white;
    letter-spacing: 0.2em;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
</style>
