<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-04-07 22:19:27
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-09 00:31:35
 * @FilePath: \vue_shop\src\components\goods\myAdd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- Component HTML goes here -->
    <!-- Breadcrumb面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- Card卡片视图 -->
    <el-card>
      <!-- 警告提示框 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 左侧竖直标签页 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs v-model="activeIndex" :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="基本信息" prop="goods_name">
              <el-input v-model="addForm.goods_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" placeholder="请输入商品重量"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" placeholder="请输入商品数量"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // Component data, props, methods, etc, go here
  data () {
    return {
      // Data properties go here
      // 当前激活的步骤
      activeIndex: 0,
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_introduce: '',
        goods_cat: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_introduce: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: false
      },
      manyTableData: []
    }
  },
  created () {
    // Run here when project is created
    this.getCateList()
  },
  computed: {
    cateID() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  },
  methods: {
    // Component methods go here
    // 获取所有商品分类数据
    async getCateList() {
      const { data: result } = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      if (result.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败')
      }
      this.cateList = result.data
    },
    async tabClicked() {
      if (this.activeIndex === '1') {
        const { data: result } = await this.$http.get(`/categories/${this.cateID}/attributes`, {
          params: {
            sel: 'many'
          }
        })
        if (result.meta.status !== 200) {
          return this.$message.error('获取商品参数失败')
        }
        this.manyTableData = result.data
      }
      console.log(this.manyTableData)
    },
    beforeTabLeave(activeIndex, oldActiveIndex) {
      if (this.addForm.goods_cat.length !== 3 && oldActiveIndex === '0') {
        this.$message.error('请先选择商品分类')
        return false
      }
      return true
    },
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
</style>
