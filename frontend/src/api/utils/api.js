import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    registerStudent: (data) => api.post('/auth/register/student', data),
    registerTeacher: (data) => api.post('/auth/register/teacher', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me')
};

export default api;