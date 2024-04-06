<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-04-01 00:31:17
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-06 23:23:42
 * @FilePath: \vue_shop\src\components\goods\myParams.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- Component HTML goes here -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告提示 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！！！" type="warning"
        :closable="false" show-icon></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="select-cate-row">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
          v-model="selectedCateKeys"
          :options="cateList"
          :props="cateProps"
          @change="cateHandleChange"></el-cascader>
        </el-col>
      </el-row>

      <!-- Tab标签选项卡切换区域 -->
      <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini"
            :disabled="isButtonDisabled"
            @click="addDialogVisible = true">添加动态参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" row-key="attr_id" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环attr_vals数组，渲染标签 -->
                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable
                  @close="handleCloseTag(scope.row, index)">{{ item }}</el-tag>
                <!-- 添加标签的输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  v-model.trim="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"
                  @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"
                  @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini"
            :disabled="isButtonDisabled"
            @click="addDialogVisible = true">添加静态属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环attr_vals数组，渲染标签 -->
                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable
                  @close="handleCloseTag(scope.row, index)">{{ item }}</el-tag>
                <!-- 添加标签的输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  v-model.trim="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>21
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"
                  @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"
                  @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加' + titleTest"
      :visible.sync="addDialogVisible"
      @closed="addDialogClosed"
      width="30%">
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
        <el-form-item :label="titleTest" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑参数对话框 -->
    <el-dialog
      :title="'编辑' + titleTest"
      :visible.sync="editDialogVisible"
      @closed="editDialogClosed"
      width="30%">
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
        <el-form-item :label="titleTest" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // Component data, props, methods, etc, go here
  data () {
    return {
      // Data properties go here
      componentKey: 0,
      // 商品分类级联选择器配置
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: false
      },
      // 商品分类列表
      cateList: [],
      // 选中的商品分类
      selectedCateKeys: [],
      // 当前激活的tab标签
      activeTabName: 'many',
      // 动态参数表格数据
      manyTableData: [],
      // 静态属性表格数据
      onlyTableData: [],
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      // 添加参数的表单数据
      addForm: {
        attr_name: ''
      },
      // 添加参数的表单验证规则
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {
        attr_name: ''
      },
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blue' }
        ]
      },
      // 标签输入框相关数据
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    // Run here when project is created
    this.getCateList()
  },
  methods: {
    // Component methods go here
    // 保存标签数据
    async saveAttrVals(row, options) {
      const { data: result } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        // attr_sel: this.activeTabName,
        attr_sel: row.attr_sel,
        // attr_vals: [...row.attr_vals, row.inputValue.join(' ')]
        attr_vals: row.attr_vals.join(' ')
      })

      if (options === 'add') {
        if (result.meta.status !== 200) {
          return this.$message.error('添加标签失败！')
        }
        this.$message.success('添加标签成功！')
      } else if (options === 'delete') {
        if (result.meta.status !== 200) {
          return this.$message.error('删除标签失败！')
        }
        this.$message.success('删除标签成功！')
      } else {
        if (result.meta.status !== 200) {
          return this.$message.error('操作失败！')
        }
        this.$message.success('操作成功！')
      }
    },
    // 获取商品分类列表
    async getCateList() {
      const { data: result } = await this.$http.get('categories')
      if (result.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      this.cateList = result.data
    },
    // 获取参数列表数据
    async getParamsData() {
      // 如果选中的商品分类不是第三级分类，清空选中的商品分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      // 获取参数列表
      // 根据所选分类的id和当前激活的tab标签，获取参数列表
      const { data: result } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: this.activeTabName
        }
      })
      if (result.meta.status !== 200) {
        return this.$message.error('获取参数列表失败！')
      }

      // 处理attr_vals字段，将字符串转换为数组
      result.data.forEach(
        (item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(/\s+/) : []
          this.$set(item, 'inputVisible', false)
          this.$set(item, 'inputValue', '')
        }
      )

      // 根据当前激活的tab标签，将数据赋值给对应的表格数据
      if (this.activeTabName === 'only') {
        this.onlyTableData = result.data
      } else {
        this.manyTableData = result.data
      }
    },
    // 显示标签输入框
    // 文本框失去焦点或者按下回车键时触发
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }

      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false

      // 没有return，说明输入框有值
      this.saveAttrVals(row, 'add')
    },
    // 删除参数事件
    async removeParams(attrId) {
      const confirmResult = await this.$confirm('是否删除该参数？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(
        (error) => {
          return error
        }
      )

      // 判断用户点击的是取消
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }

      // 删除参数业务逻辑
      const { data: result } = await this.$http.delete(`categories/${this.cateId}/attributes/${attrId}`)
      if (result.meta.status !== 200) {
        return this.$message.error('删除参数失败！')
      }
      this.$message.success('删除参数成功！')
      this.getParamsData()
    },
    // 显示编辑对话框
    async showEditDialog(attrId) {
      // 根据参数id获取参数数据
      const { data: result } = await this.$http.get(`categories/${this.cateId}/attributes/${attrId}`, {
        params: {
          attr_sel: this.activeTabName
        }
      })

      // 判断获取参数数据是否成功
      if (result.meta.status !== 200) {
        return this.$message.error('获取参数失败！')
      }

      this.editForm = result.data
      this.editDialogVisible = true
    },
    // 添加对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加参数事件
    addParams() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        // 添加参数
        const { data: result } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeTabName
        })
        if (result.meta.status !== 201) {
          return this.$message.error('添加参数失败！')
        }
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        this.getParamsData()
      })
    },
    // 商品分类选择器改变事件
    cateHandleChange() {
      this.getParamsData()
    },
    // 编辑对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑参数事件
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        // 编辑参数
        const { data: result } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeTabName
        })
        if (result.meta.status !== 200) {
          return this.$message.error('编辑参数失败！')
        }
        this.$message.success('编辑参数成功！')
        this.editDialogVisible = false
        this.getParamsData()
      })
    },
    // 关闭标签事件
    handleCloseTag(row, index) {
      row.attr_vals.splice(index, 1)
      this.saveAttrVals(row, 'delete')
    },
    // Tab标签点击事件
    handleTabClick() {
      this.getParamsData()
    },
    // 点击按钮，显示标签输入框
    showInput(row) {
      row.inputVisible = true
      this.$nextTick((_) => {
        // this.$refs.saveTagInput.$refs.input.focus()
        this.$refs.saveTagInput.focus()
      })
    }
  },
  computed: {
    // Component computed properties go here
    // 当前选中的三级分类id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 如果按钮需要被禁用，返回true，否则返回false
    isButtonDisabled() {
      return this.selectedCateKeys.length !== 3
    },
    titleTest() {
      if (this.activeTabName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
.select-cate-row {
  margin: 20px 0;
  font-size: 15px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 150px;
  margin: 10px;
}
</style>
