import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7082/',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status } = error.response;
        // if (status === 403) {
        //     window.location.href = '/';
        // }
        // else if(status === 401){
        //     window.location.href = '/';
        // }
        return Promise.reject(error);
    }
);

export { instance };