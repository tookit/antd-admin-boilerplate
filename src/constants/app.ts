import type { ThemeConfig } from 'antd';

/** Change these values to rebrand the boilerplate. */
export const APP_CONFIG = {
  name: 'AdminPro',
  logo: '/logo-symbol.svg',
  version: '0.1.0',
  theme: {
    primaryColor: '#1677FF',
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
    fontSize: 14,
    borderRadius: 8,
    borderRadiusLG: 12,
    controlHeight: 36,
    colorBgLayout: '#F5F7FB',
    colorText: '#1F2937',
    colorTextSecondary: '#626D7D',
    colorTextPlaceholder: '#707B8B',
    colorBorderSecondary: '#EEF0F3',
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
  components: { Card: { headerFontSize: 16 }, Table: { headerBg: '#F8FAFC' } },
};

export const STORAGE_KEYS = { USER: 'antd-admin-boilerplate-user' } as const;

/**
 * Chart chrome. `series` is the brand primary, checked against the white card
 * surface for lightness band, chroma, and >= 3:1 contrast. Every chart here plots
 * a single measure, so all marks share one hue — the axis and tooltip carry the
 * values, and colour never re-encodes what mark length already shows.
 */
export const CHART_TOKENS = {
  series: APP_CONFIG.theme.primaryColor,
  seriesFillOpacity: 0.1,
  grid: '#e6eef8',
  axisLabel: '#67727a',
} as const;

/**
 * Spread this into a plot: `<Area {...NO_ENTRY_ANIMATION} />`. The entry animation
 * is decorative and G2 ignores `prefers-reduced-motion`, so it would animate for
 * exactly the people who asked it not to.
 *
 * Spread from a variable rather than written as a prop because @ant-design/plots
 * types `AreaOptions` as `Omit<Options, 'yField'>`, and `Omit` over an
 * intersection containing a union drops mark-level keys — the prop is rejected by
 * the types but reaches G2 at runtime.
 */
export const NO_ENTRY_ANIMATION = { animate: false };
