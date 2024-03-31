<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-03-30 21:09:07
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-03-31 16:59:58
 * @FilePath: \vue_shop\src\components\goods\myCate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- Component HTML goes here -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格视图区域 -->
      <tree-table class="treeTable"
        :data="cateList" :columns="columns"
        :selection-type="false" :expand-type="false" show-index index-text="#">
        <template slot="isValid" slot-scope="scope">
          <!-- <el-tag v-if="scope.row.cat_deleted === false" type="success">有效</el-tag>
          <el-tag v-else type="danger">无效</el-tag> -->
          <i class="el-icon-success" style="color: lightgreen;"
            v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-error" style="color: lightgreen;"
            v-else></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1" size="mini">二级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.cat_level === 2" size="mini">三级</el-tag>
        </template>
        <template slot="operation">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentNumChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 表格视图区域 el-table -->
    <!-- <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :default-expand-all="false"
      :tree-props="{children: 'children'}">
      <el-table-column
        type="index"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称">
      </el-table-column>
    </el-table> -->

    <el-dialog
      title="提示"
      :visible.sync="addCateDialogVisible"
      width="50%">
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类"></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
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
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类列表
      cateList: [],
      // 总数据条数
      total: 0,
      // 表格列配置
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 使用插槽自定义显示内容
          type: 'template',
          // 插槽名称
          template: 'isValid'
        },
        {
          label: '排序',
          // 使用插槽自定义显示内容
          type: 'template',
          // 插槽名称
          template: 'order'
        },
        {
          label: '操作',
          // 使用插槽自定义显示内容
          type: 'template',
          // 插槽名称
          template: 'operation'
        }
      ],
      // 控制添加分类对话框的显示隐藏
      addCateDialogVisible: false,
      // 添加分类表单数据对象
      addCateForm: {
        // 分类名称
        cat_name: '',
        // 分类父id
        cat_parent_id: 0,
        // 分类等级默认为一级分类
        cat_level: 0
      },
      // 添加分类表单验证规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // Component methods go here
    // 获取商品分类列表
    async getCateList() {
      const { data: result } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (result.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败！')
      }
      // 把数据赋值给商品分类列表
      this.cateList = result.data.result
      // 把总数据条数赋值给total
      this.total = result.data.total
    },
    async pageSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    async pageCurrentNumChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      this.addCateDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
.treeTable {
  margin-top: 15px;
}
</style>
