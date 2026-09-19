import type { DashboardData, RoleCount, SignupPoint, User, UserInput, UserRole } from '@/types';

const ROLES: UserRole[] = ['admin', 'editor', 'viewer'];

let users: User[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-10-06',
  },
  {
    id: 2,
    name: 'Taylor Kim',
    email: 'taylor.kim@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2025-11-12',
  },
  {
    id: 3,
    name: 'Sofia Almeida',
    email: 'sofia.almeida@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-01-08',
  },
  {
    id: 4,
    name: 'Priya Raman',
    email: 'priya.raman@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-19',
  },
  {
    id: 5,
    name: 'Emma Larsen',
    email: 'emma.larsen@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-02-03',
  },
  {
    id: 6,
    name: 'Tom Becker',
    email: 'tom.becker@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-02-27',
  },
  {
    id: 7,
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-03-22',
  },
  {
    id: 8,
    name: 'Aisha Bello',
    email: 'aisha.bello@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-04-11',
  },
  {
    id: 9,
    name: 'Daniel Okafor',
    email: 'daniel.okafor@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-05-04',
  },
  {
    id: 10,
    name: 'Hana Ito',
    email: 'hana.ito@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-05-30',
  },
  {
    id: 11,
    name: 'Viktor Novak',
    email: 'viktor.novak@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-06-02',
  },
  {
    id: 12,
    name: 'Grace Lim',
    email: 'grace.lim@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-06-25',
  },
  {
    id: 13,
    name: "Liam O'Connor",
    email: 'liam.oconnor@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-07-14',
  },
  {
    id: 14,
    name: 'Ruben Ortiz',
    email: 'ruben.ortiz@example.com',
    role: 'viewer',
    status: 'invited',
    createdAt: '2026-07-29',
  },
  {
    id: 15,
    name: 'Chloe Dubois',
    email: 'chloe.dubois@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2026-08-09',
  },
  {
    id: 16,
    name: 'Nadia Haddad',
    email: 'nadia.haddad@example.com',
    role: 'editor',
    status: 'invited',
    createdAt: '2026-08-26',
  },
  {
    id: 17,
    name: 'Sam Whitfield',
    email: 'sam.whitfield@example.com',
    role: 'viewer',
    status: 'invited',
    createdAt: '2026-09-01',
  },
  {
    id: 18,
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    role: 'viewer',
    status: 'invited',
    createdAt: '2026-09-10',
  },
];

/** Product-level signup volume. Independent of the `users` table above, which is the admin's slice. */
const SIGNUPS_BY_MONTH: SignupPoint[] = [
  { month: 'Oct', signups: 42 },
  { month: 'Nov', signups: 51 },
  { month: 'Dec', signups: 38 },
  { month: 'Jan', signups: 64 },
  { month: 'Feb', signups: 58 },
  { month: 'Mar', signups: 71 },
  { month: 'Apr', signups: 66 },
  { month: 'May', signups: 82 },
  { month: 'Jun', signups: 77 },
  { month: 'Jul', signups: 91 },
  { month: 'Aug', signups: 88 },
  { month: 'Sep', signups: 96 },
];

const wait = <T>(data: T): Promise<T> =>
  new Promise((resolve) => window.setTimeout(() => resolve(data), 250));

/** Derived from the live array so the tiles can never disagree with the users table. */
function metricsFor(source: User[]) {
  const count = (predicate: (user: User) => boolean) => source.filter(predicate).length;
  return [
    { label: 'Total users', value: source.length },
    { label: 'Active users', value: count((user) => user.status === 'active') },
    { label: 'Invited', value: count((user) => user.status === 'invited') },
    { label: 'Admins', value: count((user) => user.role === 'admin') },
  ];
}

function rolesFor(source: User[]): RoleCount[] {
  return ROLES.map((role) => ({ role, count: source.filter((user) => user.role === role).length }));
}

export const mockApi = {
  login: (email: string) => wait({ name: email.split('@')[0] || 'Admin', email }),

  register: (name: string, email: string) => wait({ name, email }),

  getDashboard: (): Promise<DashboardData> => {
    const snapshot = [...users];
    return wait({
      metrics: metricsFor(snapshot),
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
      signupsByMonth: SIGNUPS_BY_MONTH,
      usersByRole: rolesFor(snapshot),
    });
  },

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
