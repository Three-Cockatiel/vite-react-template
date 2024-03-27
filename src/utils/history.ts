import { redirect } from 'react-router-dom';

import BaseRouter from '@/enums/routers/base';
import queryString from 'query-string';

/**
 * 重定向到 login
 */
export const goLogin = () => {
  const { pathname, search } = location;
  if (pathname !== BaseRouter.LOGIN) {
    const loginPath = `${BaseRouter.LOGIN}?${queryString.stringify({ next: encodeURIComponent(pathname + search) })}`;
    redirect(loginPath);
  }
};

/**
 * 重定向到登陆时跳转
 */
export const goNext = () => {
  const { pathname, search } = location;
  const nextPath: string = (queryString.parse(search)?.next as string) || BaseRouter.BASE;
  if (pathname === BaseRouter.LOGIN) {
    redirect(nextPath);
  }
};
