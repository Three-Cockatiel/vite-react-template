import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LayoutContext from './context/layout-context';
import routers from '@/routes';
import antdTheme from './constants/antd-theme';

import { App, ConfigProvider } from 'antd';

import type { ThemeConfig } from 'antd';

const router = createBrowserRouter(routers);

function Index() {
  // 侧边栏的显隐
  const [siderHidden, setSiderHidden] = useState<boolean>(false);
  // header菜单的现隐
  const [menuHidden, setMenuHidden] = useState<boolean>(false);
  // 全局暗黑 & 日常模式切换 & 皮肤切换
  const [theme, setTheme] = useState<ThemeConfig>(antdTheme);

  return (
    <ConfigProvider theme={theme}>
      <App>
        <LayoutContext.Provider
          value={{
            siderHidden,
            setSiderHidden,
            menuHidden,
            setMenuHidden,
            theme,
            setTheme,
          }}
        >
          <RouterProvider router={router} />
        </LayoutContext.Provider>
      </App>
    </ConfigProvider>
  );
}

export default Index;
