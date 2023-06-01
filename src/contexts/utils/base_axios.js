import axios from "axios";
import { url } from "constants";

export const baseAxios = axios.create({
  baseURL: url,
});

baseAxios.interceptors.request.use(
  (config) => {
    const auth_token = localStorage.getItem("token");
    if (auth_token) config.headers.Authorization = 'Bearer '+auth_token;
    return config;
  },
  (error) => Promise.reject(error)
);

