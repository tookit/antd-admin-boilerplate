import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { APP_CONFIG } from '@/constants/app';

export default function AuthLayout() {
  return (
    <Layout className="layout-auth">
      <Layout.Content className="auth-content">
        <div className="auth-container">
          <div className="auth-form-container">
            <Outlet />
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer className="auth-footer">
        <Typography.Text className="version-text">
          {APP_CONFIG.name} v{APP_CONFIG.version} © {new Date().getFullYear()}
        </Typography.Text>
      </Layout.Footer>
    </Layout>
  );
}
