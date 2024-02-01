// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout.vue';

const staticRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login.vue'),
    },
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Layout',
                component: () => import('@/components/HelloWorld.vue'),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes,
});

// 动态添加路由的函数，注意路径处理
export const addDynamicRoutes = (menuData, parentPath = '/') => {
    menuData.forEach((item) => {
        const fullPath = `${parentPath}${item.url}`.replace('//', '/');
        if (item.children && item.children.length > 0) {
            addDynamicRoutes(item.children, fullPath);
        } else {
            const route = {
                path: fullPath,
                name: item.name,
                component: () => import(`@/views${fullPath}.vue`),
                meta: { showInMenu: true, title: item.name } // 添加 meta 属性
            };
            router.addRoute('Layout', route);
        }
    });
};

export default router;
