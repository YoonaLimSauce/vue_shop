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
            <el-row :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter ']" v-for="(item, index) in scope.row.children" :key="item.id">
              <!-- 一级权限 -->
              <el-col :span="5" :offset="0" :push="1">
                <el-tag closable @close="removeRightById(scope.row, item.id) ">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :span="6" :class="[subIndex === 0 ? '0' : 'bdtop', 'vcenter']" v-for="(subItem, subIndex) in item.children" :key="subItem.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, subItem.id) ">
                      {{ subItem.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(subSubItem) in subItem.children" :key="subSubItem.id" closable @close="removeRightById(scope.row, subSubItem.id) ">
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
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <el-button size="mini" type="warning" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 权限分配的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible"
      width="50%">
      <el-tree :data="rightsList" :props="treeProps" show-checkbox
        node-key="id" :default-expand-all="true" :default-checked-keys="defaultCheckedKeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolesList: [],
      // 控制分配权限对话框的显示和隐藏
      setRightDialogVisible: false,
      // 所有权限列表数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的权限id列表
      defaultCheckedKeys: []
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
    },
    async showSetRightDialog(role) {
      const { data: result } = await this.$http.get('rights/tree')
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.message)
      }
      this.rightsList = result.data
      this.defaultCheckedKeys = []
      this.getLeafKeys(role, this.defaultCheckedKeys)
      // 显示对话框
      this.setRightDialogVisible = true
    },
    async removeRightById(role, rightId) {
      // 弹框提示用户是否删除权限
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(
        (result) => {
          return result
        }
      )
      // 判断用户是否点击了确定按钮
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发送请求删除权限
      const { data: result } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (result.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      // 刷新页面
      role.children = result.data
    },
    getLeafKeys(node, array) {
      if (!node.children) {
        return array.push(node.id)
      }
      node.children.forEach(
        (item) => {
          this.getLeafKeys(item, array)
        }
      )
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
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>
