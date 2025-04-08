import axios from "axios";

const URL = import.meta.env.VITE_APP_ENV == "local" ? 'http://localhost:8000/api' : 'https://keymatch.sertsoft.com.br/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: URL,
})

export const getCsrfCookie = () => {
    return api.get('/sanctum/csrf-cookie').then(response => response);
};

