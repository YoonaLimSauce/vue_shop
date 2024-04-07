<!--
 * @Author: Yoona Lim miraclefishleong@gmail.com
 * @Date: 2024-04-07 00:30:27
 * @LastEditors: Yoona Lim miraclefishleong@gmail.com
 * @LastEditTime: 2024-04-07 22:13:14
 * @FilePath: \vue_shop\src\components\goods\myList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
      <!-- 搜索和添加商品区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
            @clear="getGoodsList">
          <!-- <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
            @clear="getGoodsList" @input="getGoodsList"> -->
            <el-button slot="append" icon="el-icon-search"
              @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="removeByID(scope.row.goods_id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
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

      this.$message.success('获取商品列表数据成功！')
      this.goodsList = result.data.goods
      this.total = result.data.total
    },
    async removeByID(id) {
      const confirmResult = await this.$confirm('是否删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(
        (error) => {
          return error
        }
      )

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除商品！')
      }

      const { data: result } = await this.$http.delete(`goods/${id}`)
      if (result.meta.status !== 200) {
        return this.$message.error('删除商品失败！')
      }

      this.$message.success('删除商品成功！')
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
/* Component CSS goes here */
</style>
