import type { ReactNode } from 'react';
import type { NonIndexRouteObject } from 'react-router';

export interface CustomRouter extends NonIndexRouteObject {
  name?: string; // 标题
  icon?: ReactNode;
  siderHidden?: boolean;
  menuHidden?: boolean;
  childrenInMenuHidden?: boolean;
  children?: CustomRouter[];
  key?: string;
  access?: boolean;
}
