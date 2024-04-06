<template>
  <div>
    <!-- Component HTML goes here -->
    <!-- Breadcrumb面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- Card 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  // Component data, props, methods, etc, go here
  data () {
    return {
      // Data properties go here
      // 商品列表数据查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表数据
      goodsList: [],
      // 商品列表数据总数
      total: 0
    }
  },
  created () {
    // Run here when project is created
    this.getGoodsList()
  },
  methods: {
    // Component methods go here
    // 获取商品列表数据
    async getGoodsList() {
      const { data: result } = await this.$http.get('goods', {
        params: this.queryInfo
      })

      if (result.meta.status !== 200) {
        return this.$message.error('获取商品列表数据失败！')
      }

      this.goodsList = result.data.goods
      this.total = result.data.total
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
</style>
