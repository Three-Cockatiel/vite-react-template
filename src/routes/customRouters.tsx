import BaseRouter from '@/enums/routers/base';

import { HomeOutlined } from '@ant-design/icons';
import Home from '@/pages/home';

import type { CustomRouter } from './type';

const customRouters: CustomRouter[] = [
  {
    name: '首页',
    path: BaseRouter.HOME,
    element: <Home />,
    icon: <HomeOutlined />,
  },
];

export default customRouters;
