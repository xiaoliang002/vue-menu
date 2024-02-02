// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// 登录函数
export const login = async (username, password) => {
    const response = await apiClient.post('/token/', { username, password });
    if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access); // 保存访问令牌
    }
    return response.data; // 返回响应数据，包含access和refresh令牌
};

// 获取菜单数据函数
export const fetchMenu = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await apiClient.post('/user/menu/', {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data; // 返回菜单数据
};
