<!-- eslint-disable indent -->
<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form" :model="loginForm">
                <!-- 用户名 -->
                <el-form-item>
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user">
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima">
                    </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary">
                        登录
                    </el-button>
                    <el-button type="info">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      /* 登录表单的数据对象绑定 */
      loginForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box {
        background-color: #FFFFFF;
        height: 300px;
        width: 450px;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #EEEEEE;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #DDDDDD;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #FFFFFF;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-color: #EEEEEE;
            }
        }
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
