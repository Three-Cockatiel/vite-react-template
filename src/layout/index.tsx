import { isRouteErrorResponse, redirect, useRouteError } from 'react-router';

import BaseRouter from '@/enums/routers/base';
import Component from './layout-component';

/**
 * @description layout
 * @author Huang Wenjie
 * @createDate 2024-03-21
 */

async function loader() {
  const user = await new Promise((resolve) => {
    resolve({
      userName: 'mock',
    });
  });

  // 如果没有用户信息，重定向到登陆
  if (!user) {
    throw redirect(BaseRouter.LOGIN);
  }

  const permission = await new Promise((resolve) => {
    resolve(['home']);
  });

  return {
    user,
    permission,
  };
}

function ErrorBoundary() {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{(error as any)?.message ?? error}</h1>
  );
}

export { Component, ErrorBoundary, loader };
