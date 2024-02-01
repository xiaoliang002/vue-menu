<template>
  <el-row type="flex" justify="center" align="middle" style="height: 100vh;">
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <el-card class="login-card">
        <el-form :model="loginForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchMenuAndAddRoutes } from '@/services/api'; // 假设这个函数处理登录并获取菜单
import { login } from '@/services/api'; // 假设这个函数处理登录并获取菜单

export default {
  setup() {
    const router = useRouter();
    const loginForm = reactive({
      username: '',
      password: ''
    });
    const loading = ref(false); // 控制加载状态

    const handleLogin = async () => {
      const token = await login(loginForm.username, loginForm.password);
      if (token) {
        const success = await fetchMenuAndAddRoutes(); // 获取菜单并添加路由
        if (success) {
          router.push('/'); // 登录成功，且菜单数据获取后跳转
        }
      }
    };

    return { loginForm, handleLogin, loading };
  }
};
</script>

<style scoped>
.login-card {
  width: 100%;
  background: white;
}
</style>
