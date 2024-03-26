import { useContext, useMemo } from 'react';
import { NavLink, useMatches } from 'react-router-dom';

import LayoutContext from '@/context/layout-context';

import { SYSTEM_NAME } from '@/constants/common';
import { menuRoutes } from '@/routes';
import usePermission from '@/hooks/usePermission';

import { Layout, Menu } from 'antd';

import type { MenuProps } from 'antd';
import type { CustomRouter } from '@/routes/type';

type MenuItem = Required<MenuProps>['items'][number];

/**
 * @description 侧边栏
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

function transformMenus(routes: CustomRouter[], hasPermission: (id?: string) => boolean): MenuItem[] {
  return routes
    ?.filter(({ id, siderHidden, access }) => {
      const hasAccess = access ? hasPermission(id) : true;
      return !siderHidden && hasAccess;
    })
    ?.map(({ children, childrenInMenuHidden, name, icon, id, path }) => {
      // 格式化 children
      if (!childrenInMenuHidden && children && children?.length) {
        return {
          icon,
          label: name,
          key: id!,
          children: transformMenus(children, hasPermission),
        };
      }

      return {
        icon,
        label: (
          <NavLink
            to={path!}
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            {name}
          </NavLink>
        ),
        key: id!,
      };
    });
}

export default function LayoutSider() {
  const { theme } = useContext(LayoutContext);

  const matches = useMatches();
  const { hasPermission } = usePermission();

  const items = transformMenus(menuRoutes, hasPermission);

  const selectedKeys = useMemo(() => {
    return matches?.map((item) => item?.id);
  }, [matches]);

  const openKeys = useMemo(() => {
    return selectedKeys?.slice(0, -1);
  }, [selectedKeys]);

  return (
    <Layout.Sider collapsible className={`layout-sider ${theme?.isLight ? 'sider-light' : 'sider-dark'}`} theme="light">
      <div className="layout-sider-logo">
        <div className="logo-title">{SYSTEM_NAME}</div>
      </div>
      <Menu mode="inline" items={items} defaultSelectedKeys={selectedKeys} defaultOpenKeys={openKeys} />
    </Layout.Sider>
  );
}
