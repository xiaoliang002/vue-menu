<template>
  <el-card class="login-box">
    <el-form ref="loginForm" :model="loginForm" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus';
import { login, fetchMenu } from '@/services/api';
import {addDynamicRoutes} from '@/router'; // 确保正确导入addDynamicRoutes函数

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.loginForm.username, this.loginForm.password);
        if (response.code === 200) {
          ElMessage.success('登录成功');
          // 存储访问令牌
          localStorage.setItem('access_token', response.access);
          // 获取并处理菜单数据
          const menuData = await fetchMenu();
          console.log('获取到的菜单数据:', menuData);
          localStorage.setItem('menuData', JSON.stringify(menuData)); // 保存菜单数据
          // 在这里调用addDynamicRoutes函数动态添加路由
          addDynamicRoutes(menuData);
          // 确保路由添加完成后再跳转
          this.$nextTick(() => {
            this.$router.push('/home');
          });
        } else {
          ElMessage.error('登录失败');
        }
      } catch (error) {
        console.error('登录异常:', error);
        ElMessage.error('登录异常');
      }
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 360px;
  margin: 50px auto;
}
</style>
