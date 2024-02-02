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

const componentMappings = {
    '首页': () => import('@/components/HelloWorld.vue'),
    '用户管理': () => import('@/components/HelloWorld.vue'),
    '仪表盘': () => import('@/components/HelloWorld.vue'),
    '域名服务': () => import('@/components/HelloWorld.vue'),
};

// 动态添加路由的函数
export const addDynamicRoutes = (menuData, parentPath = '/') => {
    menuData.forEach(item => {
        const fullPath = `${parentPath}${item.url}`.replace('//', '/');
        // 检查componentMappings是否有对应的组件，否则使用默认组件
        const componentFunc = componentMappings[item.name] || (() => import('@/components/HelloWorld.vue')); // 适当调整默认组件的路径
        const route = {
            path: fullPath,
            name: item.name,
            component: componentFunc,
            meta: { showInMenu: true, title: item.name } // 根据需要添加更多meta信息
        };
        router.addRoute('Layout', route); // 假设所有动态路由都是'Layout'组件的子路由
        if (item.children && item.children.length > 0) {
            // 递归添加子路由
            addDynamicRoutes(item.children, fullPath);
        }
    });
};

export default router;
