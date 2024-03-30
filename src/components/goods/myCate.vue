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
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格视图区域 -->

    <!-- 分页区域 -->
  </div>
</template>

<script>
export default {
  // Component data, props, methods, etc, go here
  data () {
    return {
      // Data properties go here
    }
  },
  methods: {
    // Component methods go here
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
</style>
