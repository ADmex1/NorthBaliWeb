// utils/adminApi.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5001/api',
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const fetchUsers = () => API.get('/admin/user-data');
export const fetchRecentReviews = () => API.get('/admin/recent-reviews');
export const fetchDestinations = () => API.get('/admin/destination-data');
export const uploadDestination = (formData) => API.post('/admin/upload', formData);
export const updateDestination = (id, formData) => API.put(`/admin/update/${id}`, formData);
export const deleteDestination = (id) => API.delete(`/admin/delete/${id}`);
