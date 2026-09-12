import type { ThemeConfig } from 'antd';

/** Change these values to rebrand the boilerplate. */
export const APP_CONFIG = {
  name: 'Admin Template',
  logo: '/logo-symbol.svg',
  version: '0.1.0',
  theme: {
    primaryColor: '#007AFF',
    infoColor: '#3793d1',
    successColor: '#37B8A1',
    warningColor: '#fac864',
    errorColor: '#eb5454',
  },
} as const;

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: APP_CONFIG.theme.primaryColor,
    colorInfo: APP_CONFIG.theme.infoColor,
    colorSuccess: APP_CONFIG.theme.successColor,
    colorWarning: APP_CONFIG.theme.warningColor,
    colorError: APP_CONFIG.theme.errorColor,
    fontSize: 16,
    colorTextBase: '#061824',
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

export const STORAGE_KEYS = { USER: 'antd-admin-boilerplate-user' } as const;
