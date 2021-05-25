import axios from 'axios'

axios.interceptors.request.use(function (config) {
    if (!config.url.includes('wikipedia')) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
});
