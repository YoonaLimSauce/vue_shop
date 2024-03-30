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
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类列表
      cateList: [],
      // 总数据条数
      total: 0
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
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
</style>
