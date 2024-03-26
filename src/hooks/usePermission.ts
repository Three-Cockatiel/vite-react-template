import { useCallback, useMemo } from 'react';
import { useRouteLoaderData } from 'react-router';

import { BASE_ID } from '@/constants/common';

/**
 * 自定义路由 鉴权
 */
export default function usePermission() {
  const loaderData: any = useRouteLoaderData(BASE_ID);

  const permission: any[] = useMemo(() => loaderData?.permission ?? [], [loaderData?.permission]);

  /**
   * 是否有权限（没有id则视为不鉴权）
   * @param id 路由id
   * @param customFn 自定义返回权限boolean
   */
  const hasPermission = useCallback(
    (id?: string, customFn?: (permission: any[]) => boolean): boolean => {
      // 没有id 或者是format添加的 不需要鉴权
      if (!id || id?.includes('__AUTO_FORMAT_')) return true;

      if (typeof customFn === 'function') {
        return !!permission?.length && customFn(permission);
      }
      return !!permission?.length && permission?.includes(id);
    },
    [permission],
  );

  return {
    permission,
    hasPermission,
  };
}
