<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu :collapse="isCollapse"
                 background-color="#20222A"
                 class="aside-menu"
                 router
                 text-color="#bfcbd9"
                 active-text-color="#20a0ff">
          <el-menu-item v-for="menu in menuData" :key="menu.id" :index="menu.url" v-if="!menu.children || menu.children.length === 0">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
          </el-menu-item>
          <el-sub-menu v-for="menu in menuData" :key="menu.id" v-if="menu.children && menu.children.length > 0" :index="menu.url">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item v-for="child in menu.children" :key="child.id" :index="child.url">
              {{ child.name }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- Header and Main Content here -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuData: [
        // 你的菜单数据结构
      ],
    };
  },
  mounted() {
    console.log("Before loadMenuData");
    this.loadMenuData();
    console.log("After loadMenuData");
  },
  methods: {
    loadMenuData() {
      // 假设从 localStorage 中获取菜单数据
      const storedMenu = localStorage.getItem('dynamicMenu');
      console.log("Loaded menu data: ", this.menuData); // 直接打印对象或数组

      if (storedMenu) {
        this.menuData = JSON.parse(storedMenu);
        console.log("Loaded menu data: ", this.menuData); // 直接打印对象或数组

      }
    }
  },

}
</script>

<style>
/* 样式调整 */
</style>
