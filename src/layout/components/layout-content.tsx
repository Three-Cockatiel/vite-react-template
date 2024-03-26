import { Outlet } from 'react-router';

import { Card, Layout, theme } from 'antd';
import LayoutFooter from './layout-footer';

/**
 * @description Layout Content
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

export default function LayoutContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout.Content className="layout-content">
      <Card
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 300,
        }}
      >
        <Outlet />
      </Card>
      <LayoutFooter />
    </Layout.Content>
  );
}
