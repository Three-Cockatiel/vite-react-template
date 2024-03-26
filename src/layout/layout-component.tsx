import { useContext } from 'react';

import LayoutContext from '@/context/layout-context';

import { Layout } from 'antd';
import LayoutSider from './components/layout-sider';
import LayoutHeader from './components/layout-header';
import LayoutContent from './components/layout-content';

import './style.less';

/**
 * @description layout 的 component
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

export default function Component() {
  const { menuHidden, siderHidden } = useContext(LayoutContext);
  return (
    <Layout className="layout-outbox">
      {!siderHidden && <LayoutSider />}
      <Layout>
        {!menuHidden && <LayoutHeader />}
        <LayoutContent />
      </Layout>
    </Layout>
  );
}
