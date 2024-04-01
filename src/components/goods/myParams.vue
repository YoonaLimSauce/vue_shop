<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-04-01 00:31:17
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-02 00:39:37
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

    <!-- 卡片视图区域-->
    <el-card>
      <!-- 警告提示 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！！！" type="warning"
        :closable="false" show-icon></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="select-cate-row">
        <el-col>
          <span>选择商品分类</span>
        </el-col>
      </el-row>
    </el-card>
    <el-cascader
      v-model="selectedCateKeys"
      :options="cateList"
      :props="cateProps"
      @change="cateHandleChange"></el-cascader>
  </div>
</template>

<script>
export default {
  // Component data, props, methods, etc, go here
  data () {
    return {
      // Data properties go here
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
      selectedCateKeys: ''
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
      if (result.meta.status !== 200) return this.$message.error('获取商品分类失败！')
      this.cateList = result.data
    },
    // 商品分类选择器改变事件
    cateHandleChange() {
      console.log(this.cateList)
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
.select-cate-row {
  margin: 20px 0;
  font-size: 18px;
}
</style>
