import { Navigate } from 'react-router-dom';

import { BASE_ID } from '@/constants/common';
import BaseRouter from '@/enums/routers/base';
import customRouters from './customRouters';
import { formatId2Routes, transformRoutes } from './transformRoutes';

import Login from '@/pages/login';
import NotFoundPage from '@/pages/not-found';

import type { RouteObject } from 'react-router-dom';

/**
 * 最终标准路由，会经过transformRoutes将customRouters转换成标准路由输出
 */

export const menuRoutes = formatId2Routes(customRouters);

const routers: RouteObject[] = [
  {
    path: BaseRouter.BASE,
    id: BASE_ID,
    lazy: () => import('@/layout'),
    children: [
      {
        index: true,
        element: <Navigate to={BaseRouter.HOME} replace />,
      },
      ...transformRoutes(menuRoutes),
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: BaseRouter.LOGIN,
    element: <Login />,
  },
];

export default routers;
