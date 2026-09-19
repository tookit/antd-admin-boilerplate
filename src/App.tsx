import { useEffect, useState, type CSSProperties } from 'react';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import Router from '@/routes';
import { appTheme } from '@/constants/app';

function ThemeSurface() {
  const { token } = theme.useToken();
  const style = {
    '--app-primary': token.colorPrimary,
    '--app-primary-bg': token.colorPrimaryBg,
    '--app-bg': token.colorBgLayout,
    '--app-surface': token.colorBgContainer,
    '--app-text': token.colorText,
    '--app-muted': token.colorTextSecondary,
    '--app-border': token.colorBorderSecondary,
    '--app-hover': token.colorFillAlter,
    '--app-danger-bg': token.colorErrorBg,
    '--app-danger': token.colorError,
    '--app-success': token.colorSuccess,
  } as CSSProperties;
  return (
    <div className="app-surface" style={style}>
      <AntdApp>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </AntdApp>
    </div>
  );
}
function ThemedApp() {
  const { settings } = useSettings();
  const [systemDark, setSystemDark] = useState(
    () => matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const dark = settings.mode === 'dark' || (settings.mode === 'system' && systemDark);
  return (
    <ConfigProvider
      locale={settings.language === 'zh-CN' ? zhCN : enUS}
      theme={{
        ...appTheme,
        algorithm: [
          dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          ...(settings.compact ? [theme.compactAlgorithm] : []),
        ],
        token: {
          ...appTheme.token,
          colorPrimary: settings.primaryColor,
          colorInfo: settings.primaryColor,
          ...(dark
            ? {
                colorBgLayout: '#10141C',
                colorText: '#E5EAF2',
                colorTextSecondary: '#A4AFBF',
                colorTextPlaceholder: '#98A3B3',
              }
            : {}),
        },
        components: { ...appTheme.components, Table: { headerBg: dark ? '#1D2430' : '#F8FAFC' } },
      }}
    >
      <ThemeSurface />
    </ConfigProvider>
  );
}
export default function App() {
  return (
    <SettingsProvider>
      <ThemedApp />
    </SettingsProvider>
  );
}
