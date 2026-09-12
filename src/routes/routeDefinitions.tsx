import { lazy } from 'react';
import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';

const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const UserList = lazy(() => import('@/pages/users/UserList'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ErrorPage = lazy(() => import('@/pages/errors/ErrorPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

export const protectedRoutes = [
  { path: 'dashboard', name: 'Dashboard', icon: <DashboardOutlined />, component: DashboardPage },
  { path: 'users', name: 'User list', icon: <TeamOutlined />, component: UserList },
  { path: 'error/500', name: 'Server error', component: ErrorPage, hideInMenu: true },
];
export const authRoutes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
export { NotFoundPage };
