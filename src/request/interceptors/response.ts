import { ACCESS_TOKEN, EXPIRE_CODE, REFRESH_TOKEN, SUCCESS_CODE } from '@/constants/common';
import { goLogin } from '@/utils/history';
import { HttpStatusCode, type AxiosError, type AxiosResponse } from 'axios';

import { message } from 'antd';

import type { Response } from '../type';

let isRefreshing = false;
let requests: Array<() => void> = [];
export async function responseHandler(response: AxiosResponse<Response<any>>): Promise<any> {
  const { data: responseData, config, request } = response;
  const { data, code, msg } = responseData;
  const { custom } = config as any;

  switch (Number(code)) {
    case SUCCESS_CODE:
      if (custom) {
        return Promise.resolve(responseData);
      } else {
        return Promise.resolve(data);
      }
    case EXPIRE_CODE:
      if (isRefreshing) {
        return new Promise((resolve) => {
          requests.push(() => resolve(request(config)));
        });
      } else {
        isRefreshing = true;
        const { accesstoken, refreshtoken } = await request({
          url: 'token/refresh',
          method: 'POST',
          data: {
            accesstoken: sessionStorage[ACCESS_TOKEN],
            refreshtoken: sessionStorage[REFRESH_TOKEN],
          },
        });
        sessionStorage[ACCESS_TOKEN] = accesstoken;
        sessionStorage[REFRESH_TOKEN] = refreshtoken;
        isRefreshing = false;
        requests.forEach((cb) => cb());
        requests = [];
        return request(config);
      }
    default:
      if (custom) {
        return Promise.resolve(responseData);
      } else {
        message.error(msg);
        return Promise.reject(msg);
      }
  }
}

export function responseErrorHandler(error: AxiosError) {
  const status = error?.response?.status;
  let msg: string;
  switch (status) {
    case HttpStatusCode.Unauthorized:
      msg = '用户未登录';
      goLogin();
      break;
    case HttpStatusCode.Forbidden:
      msg = '用户无权限';
      break;

    case HttpStatusCode.BadRequest:
      msg = '请求参数错误';
      break;
    case HttpStatusCode.MethodNotAllowed:
      msg = '请求方法错误';
      break;
    case HttpStatusCode.NotFound:
      msg = '请求路径错误';
      break;
    case HttpStatusCode.RequestTimeout:
      msg = '请求超时';
      break;
    case HttpStatusCode.GatewayTimeout:
      msg = '服务器超时';
      break;
    default:
      msg = '服务器错误';
      break;
  }

  message.error(msg);
  return Promise.reject(msg);
}
