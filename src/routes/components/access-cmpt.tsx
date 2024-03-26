import { useContext, useEffect } from 'react';

import LayoutContext from '@/context/layout-context';

import usePermission from '@/hooks/usePermission';

import NoPermission from '@/pages/no-permission';

import type { CustomRouter } from '../type';

/**
 * @description 鉴权组件 & 统一设置
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

export default function Components(props: CustomRouter) {
  const { setMenuHidden, setSiderHidden } = useContext(LayoutContext);
  const { name, id, element, menuHidden, siderHidden, access } = props;

  const { hasPermission } = usePermission();
  const hasAccess = access ? hasPermission(id) : true;

  // 设置标题
  useEffect(() => {
    if (name) {
      document.title = name;
    }

    return () => {
      document.title = import.meta.env.VITE_SYSTEM_NAME;
    };
  }, [name]);

  // 设置侧边栏
  useEffect(() => {
    if (typeof setMenuHidden === 'function') {
      setMenuHidden(!!menuHidden);
    }
  }, [menuHidden, setMenuHidden]);

  // 设置header
  useEffect(() => {
    if (typeof setSiderHidden === 'function') {
      setSiderHidden(!!siderHidden);
    }
  }, [siderHidden, setSiderHidden]);

  return hasAccess ? element : <NoPermission />;
}
