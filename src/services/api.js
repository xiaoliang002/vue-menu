// api.js
// 确保 api.js 包含以下内容
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router, {addDynamicRoutes} from '@/router';

const API_URL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        ElMessage.error(`请求错误: ${error.response?.status} - ${error.response?.statusText}`);
        return Promise.reject(error);
    }
);

// 假设您的后端登录接口返回了菜单数据
export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('token/', { username, password });
        const token = response.data.access;
        localStorage.setItem('token', token); // 存储 token
        return token; // 返回 token 用于后续请求
    } catch (error) {
        ElMessage.error('登录失败');
        return null;
    }
};

// 动态添加路由的函数
export const fetchMenuAndAddRoutes = async () => {
    const token = localStorage.getItem('token'); // 从存储中获取 token
    if (!token) {
        ElMessage.error('Token 未找到');
        return false;
    }
    try {
        const response = await axiosInstance.post('user/menu/', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("菜单数据响应：", response.data); // 打印响应数据，确认结构
        const menuData = response.data; // 假设这是正确的菜单数据格式
        addDynamicRoutes(menuData); // 动态添加路由
        return true;
    } catch (error) {
        console.log(error);
        ElMessage.error('获取菜单数据失败');
        return false;
    }
};

