<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-04-01 00:31:17
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-04 22:32:11
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
          <el-button type="primary" size="mini" :disabled="isButtonDisabled">添加动态参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe
            :key="componentKey" :ref="tableForm">
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isButtonDisabled">添加静态属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe
            :key="componentKey" :ref="tableForm">
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
      onlyTableData: []
    }
  },
  created () {
    // Run here when project is created
    this.getCateList()
  },
  methods: {
    // Component methods go here
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
      if (this.activeTabName === 'only') {
        this.onlyTableData = result.data
      } else {
        this.manyTableData = result.data
      }
    },
    // 商品分类选择器改变事件
    cateHandleChange() {
      this.getParamsData()
    },
    handleTabClick() {
      this.getParamsData()
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
</style>
