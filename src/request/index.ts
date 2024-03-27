import axios from 'axios';
import { requestErrorHandler, requestHandler } from './interceptors/request';
import { responseErrorHandler, responseHandler } from './interceptors/response';

import type { AxiosRequestConfig } from 'axios';
import type { Response } from './type';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

instance.interceptors.request.use(requestHandler, requestErrorHandler);
instance.interceptors.response.use(responseHandler, responseErrorHandler);

function request<T = any>(url: string, options?: Omit<AxiosRequestConfig, 'url'>): Promise<T>;
function request<T = any>(
  url: string,
  options?: Omit<AxiosRequestConfig, 'url'> & { custom: true },
): Promise<Response<T>>;
function request<T = any>(
  url: string,
  options?: Omit<AxiosRequestConfig, 'url'> | (Omit<AxiosRequestConfig, 'url'> & { custom: true }),
) {
  if (options && 'custom' in options) {
    return instance.request<T, Response<T>>({
      url,
      ...options,
    });
  } else {
    return instance.request<T, T>({
      url,
      ...options,
    });
  }
}

export default request;
