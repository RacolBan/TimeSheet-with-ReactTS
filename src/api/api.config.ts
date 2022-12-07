/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosRequestConfig } from 'axios';
import { useToast } from '../hooks/useToast';
import { removeAccessToken } from '../helper/localStorage';
const axiosClient = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  headers: {
    'Content-Type': 'application/json'
  }
});
axiosClient.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  const accessToken = `Bearer ${token}`;
  request.headers = request.headers ?? {};
  request.headers.Authorization = accessToken;
  return request;
}, async error => {
  return await Promise.reject(error);
});
axiosClient.interceptors.response.use(async res => {
  return await Promise.resolve(res);
}, async err => {
  if (err.response.status === 401) {
    useToast('Invalid Token', 2);
    removeAccessToken();
    window.location.pathname = 'App/login';
  }
  return await Promise.reject(err);
});
export default axiosClient;
