export type UserRole = 'admin' | 'editor' | 'viewer';

export type UserStatus = 'active' | 'invited';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

/** Fields a user form is allowed to submit; the server owns `id` and `createdAt`. */
export type UserFormValues = Pick<User, 'name' | 'email' | 'role' | 'status'>;

/** Upsert payload: `id` present means update, absent means create. */
export type UserInput = UserFormValues & Partial<Pick<User, 'id'>>;

export interface DashboardData {
  metrics: Array<{ label: string; value: number; suffix?: string }>;
  activities: Array<{ title: string; detail: string; time: string }>;
}

export interface PaginatedResponse<T> {
  result: T[];
  total: number;
  page: number;
  per_page: number;
}
