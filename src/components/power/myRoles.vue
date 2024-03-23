<template>
  <div>
    <h3>角色列表</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      // TODO: 获取角色列表
      const { data: result } = await this.$http.get('roles')
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.message)
      }
      this.rolesList = result.data
      console.log(this.rolesList)
    }
  }
}
</script>

<style>

</style>
