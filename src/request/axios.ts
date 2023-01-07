import axios from "axios";

const _axios = axios.create({
  baseURL: process.env.NODE_ENV_HOST,
  timeout: 10000,
  withCredentials: true,
});

_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

const initAxios = async (config: any): Promise<any> => {
  return await _axios(config);
};

export default initAxios;
