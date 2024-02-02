import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 导入样式
import { addDynamicRoutes } from './router'; // 确保这个是动态添加路由的函数

// 根据存储的菜单数据恢复动态路由
const storedMenuData = localStorage.getItem('menuData');
if (storedMenuData) {
    const menuData = JSON.parse(storedMenuData);
    addDynamicRoutes(menuData);
}


const app = createApp(App);
app.use(router);
app.use(ElementPlus); // 使用 Element Plus
app.mount('#app');
