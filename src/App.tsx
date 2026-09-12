import { App as AntdApp, ConfigProvider } from 'antd';
import { AuthProvider } from '@/contexts/AuthContext';
import Router from '@/routes';
import { appTheme } from '@/constants/app';

export default function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <AntdApp>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
