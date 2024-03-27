import { ACCESS_TOKEN } from '@/constants/common';

import { message } from 'antd';

import type { InternalAxiosRequestConfig } from 'axios';

export function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage[ACCESS_TOKEN];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export function requestErrorHandler(error: any) {
  message.error('请求参数错误');
  return Promise.reject(error);
}
