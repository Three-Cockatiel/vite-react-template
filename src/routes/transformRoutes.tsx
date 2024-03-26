import { nanoid } from 'nanoid';

import Access from './components/access-cmpt';

import type { RouteObject } from 'react-router';
import type { CustomRouter } from './type';

/**
 * 自定义路由 2 标准路由
 * @returns
 */
export function transformRoutes(routes: CustomRouter[]): RouteObject[] {
  return routes?.map((customRoute) => {
    const { path, id, children, element } = customRoute;

    const route: RouteObject = {
      id,
      path,
    };

    if (element) {
      route.element = <Access {...customRoute} />;
    }

    if (children && children?.length) {
      route.children = transformRoutes(children);
    }

    return route;
  });
}

/**
 * 为route加上id，因为menu需要id
 */
export function formatId2Routes(routes: CustomRouter[]): CustomRouter[] {
  return routes?.map((customRoute) => {
    const { children, id } = customRoute;

    const route = { ...customRoute, id: id ?? `__AUTO_FORMAT_${nanoid(6)}` };

    if (children && children?.length) {
      route.children = formatId2Routes(children);
    }

    return route;
  });
}
