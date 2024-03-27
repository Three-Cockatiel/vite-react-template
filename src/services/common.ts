import { CommonApi } from '@/enums/apis/common';

import request from '@/request';
import dayjs from 'dayjs';

import type { LoginParams, LoginResponse } from '@/types/apis/common';

/**
 * login
 */
export function login(data: LoginParams) {
  return request<LoginResponse>(CommonApi.LOGIN, {
    method: 'POST',
    data,
  });
}

/**
 * 上传文件
 */
export const uploadFile = (params: Record<string, string>, file: Blob) => {
  const data = new FormData();
  data.append('file', file);
  return request<{ name: string; url: string }>('/upload', {
    method: 'POST',
    params,
    data,
  });
};

/**
 * 下载文件
 * @param url 服务器路由
 * @param data 参数
 * @param name 文件名
 * @returns
 */
export const downloadFile = async (url: string, data: Record<string, any>, name?: string) => {
  try {
    const res = await request(url, {
      method: 'POST',
      data,
      responseType: 'blob',
      custom: true,
    });
    const linkUrl = window.URL.createObjectURL(res as unknown as Blob);
    const link = document.createElement('a');
    link.href = linkUrl;
    link.download = name ?? dayjs().format('YYYY-MM-DD');
    link.click();
    link.remove();
    return Promise.resolve('下载成功');
  } catch (error) {
    return Promise.reject(new Error('下载成功'));
  }
};
