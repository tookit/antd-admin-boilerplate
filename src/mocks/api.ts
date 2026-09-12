import type { DashboardData, User, UserInput } from '@/types';

let users: User[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    email: 'alex@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-09-01',
  },
  {
    id: 2,
    name: 'Taylor Kim',
    email: 'taylor@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-09-04',
  },
  {
    id: 3,
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    role: 'viewer',
    status: 'invited',
    createdAt: '2026-09-10',
  },
];

const wait = <T>(data: T): Promise<T> =>
  new Promise((resolve) => window.setTimeout(() => resolve(data), 250));

export const mockApi = {
  login: (email: string) => wait({ name: email.split('@')[0] || 'Admin', email }),

  register: (name: string, email: string) => wait({ name, email }),

  getDashboard: (): Promise<DashboardData> =>
    wait({
      metrics: [
        { label: 'Total users', value: users.length },
        { label: 'Active users', value: users.filter((user) => user.status === 'active').length },
        { label: 'New this month', value: 12 },
        { label: 'Completion', value: 84, suffix: '%' },
      ],
      activities: [
        {
          title: 'New user invited',
          detail: 'Jordan Lee was added as a viewer.',
          time: '2 minutes ago',
        },
        {
          title: 'Profile updated',
          detail: 'Taylor Kim changed their display name.',
          time: '1 hour ago',
        },
        {
          title: 'Template initialized',
          detail: 'Mock data is ready for local development.',
          time: 'Today',
        },
      ],
    }),

  getUsers: () => wait([...users]),

  saveUser: (user: UserInput) => {
    const existing = user.id ? users.find((item) => item.id === user.id) : undefined;
    if (existing) {
      Object.assign(existing, user);
    } else {
      const nextId = users.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const nextUser: User = {
        ...user,
        id: nextId,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      users = [nextUser, ...users];
    }
    return wait(undefined);
  },

  deleteUser: (id: number) => {
    users = users.filter((user) => user.id !== id);
    return wait(undefined);
  },
};
