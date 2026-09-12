import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '@/constants/app';
import { useAuth } from '@/contexts/AuthContext';
import { protectedRoutes } from '@/routes/routeDefinitions';

const menuRoutes = protectedRoutes
  .filter((route) => !route.hideInMenu)
  .map((route) => ({ path: `/${route.path}`, name: route.name, icon: route.icon }));

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    void navigate('/login');
  };

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        title={APP_CONFIG.name}
        logo={APP_CONFIG.logo}
        layout="mix"
        navTheme="light"
        fixSiderbar
        location={{ pathname }}
        route={{ path: '/', routes: menuRoutes }}
        menuItemRender={(item, dom) => <Link to={item.path ?? '/dashboard'}>{dom}</Link>}
        headerTitleRender={() => (
          <Link to="/dashboard" className="header-brand">
            <img src={APP_CONFIG.logo} alt="" />
            <span>{APP_CONFIG.name}</span>
          </Link>
        )}
        avatarProps={{
          title: user?.name,
          render: () => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Log out',
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <Space className="header-avatar">
                <Avatar icon={<UserOutlined />} />
                <Typography.Text strong>{user?.name}</Typography.Text>
              </Space>
            </Dropdown>
          ),
        }}
        token={{
          header: {
            colorBgHeader: '#fff',
            colorHeaderTitle: '#061824',
            colorTextMenuSelected: APP_CONFIG.theme.primaryColor,
          },
          sider: {
            colorMenuBackground: '#fff',
            colorTextMenu: '#59636e',
            colorTextMenuSelected: APP_CONFIG.theme.primaryColor,
            colorBgMenuItemSelected: '#e7f3fa',
          },
        }}
        menuFooterRender={(props) =>
          props?.collapsed ? undefined : (
            <div className="layout-version">
              v{APP_CONFIG.version} © {new Date().getFullYear()}
            </div>
          )
        }
      >
        <PageContainer>
          <Outlet />
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  );
}
