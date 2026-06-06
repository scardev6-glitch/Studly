const API_URL = '/api';

const utils = {
    checkAuth: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token || !user) {
            window.location.href = '/';
            return null;
        }
        return { token, user: JSON.parse(user) };
    },

    fetchAPI: async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');
        const defaultHeaders = {
            'Content-Type': 'application/json'
        };
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: { ...defaultHeaders, ...options.headers }
        });

        if (response.status === 401) {
            localStorage.clear();
            window.location.href = '/';
            return;
        }

        return response.json();
    },

    initIcons: () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    getParam: (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    utils.initIcons();
});
