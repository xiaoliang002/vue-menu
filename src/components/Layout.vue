<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" class="aside">
      <el-menu :collapse="isCollapse" router>
        <!-- 动态渲染菜单项 -->
        <el-menu-item v-for="route in filteredRoutes" :key="route.path" :index="route.path">
          {{ route.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { computed } from 'vue';
import router from '@/router';

export default {
  name: 'Layout',
  setup() {
    const isCollapse = false;

    // 过滤出需要在侧边栏显示的路由
    const filteredRoutes = computed(() => {
      return router.getRoutes().filter(r => r.meta && r.meta.showInMenu);
    });

    return { isCollapse, filteredRoutes };
  }
};
</script>

<style scoped>
/* 您的样式细节 */
</style>
