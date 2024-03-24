<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 权限列表 -->
            <el-row :class="['bdbottom', index === 0 ? 'bdtop' : '']" v-for="(item, index) in scope.row.children" :key="item.id">
              <!-- 一级权限 -->
              <el-col :span="5" :offset="0" :push="1">
                <el-tag>
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :span="6" :class="[subIndex === 0 ? '0' : 'bdtop']" v-for="(subItem, subIndex) in item.children" :key="subItem.id">
                  <el-col :span="6">
                    <el-tag type="success">
                      {{ subItem.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(subSubItem) in subItem.children" :key="subSubItem.id">
                      {{ subSubItem.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <el-button size="mini" type="warning">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      // 获取角色列表
      const { data: result } = await this.$http.get('roles')
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.message)
      }
      this.rolesList = result.data
      console.log(this.rolesList)
    }
  }
}
</script>

<style>
  .el-tag {
    margin: 7px;
  }
  .bdtop {
    border-top: 1px solid #dddddd;
  }
  .bdbottom {
    border-bottom: 1px solid #dddddd;
  }
</style>
