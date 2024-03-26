import { Layout } from 'antd';

/**
 * @description layout footer
 * @author Huang Wenjie
 * @createDate 2024-03-25
 */

export default function LayoutFooter() {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      vite antd template ©{new Date().getFullYear()} Created by hwj
    </Layout.Footer>
  );
}
