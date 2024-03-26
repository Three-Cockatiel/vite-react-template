import { useContext } from 'react';

import LayoutContext from '@/context/layout-context';

import { Layout, Space, theme } from 'antd';
import HeaderUser from './header-user';
import DisplayMode from './header-display-mode';

/**
 * @description layout header
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

export default function LayoutHeader() {
  const { theme: layoutTheme } = useContext(LayoutContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      className={`layout-header ${layoutTheme?.isLight ? 'header-light' : 'header-dark'}`}
      style={{ background: colorBgContainer }}
    >
      <Space>
        <DisplayMode />
        <HeaderUser />
      </Space>
    </Layout.Header>
  );
}
