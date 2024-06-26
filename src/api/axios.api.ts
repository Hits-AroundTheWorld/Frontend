import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { AuthService } from "../services/auth.service";

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
        const navigate = useNavigate()
         if (status === 403) {
             toast.warning('Недостаточно прав')
             navigate('/');
         }
         else if(status === 401){
             AuthService.getUnAuthorized()
             navigate('/login');
         }
        return Promise.reject(error);
    }
);

export { instance };