import { Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import type { User } from '@/types';
import { UserActions } from './UserActions';

interface Props {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}
export function useUserTableColumns({ onEdit, onDelete }: Props): ProColumns<User>[] {
  return [
    { title: 'ID', dataIndex: 'id', search: false, width: 72 },
    { title: 'Display name', dataIndex: 'name', ellipsis: true },
    { title: 'Email', dataIndex: 'email', ellipsis: true, copyable: true },
    {
      title: 'Role',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        admin: { text: 'Admin', status: 'Success' },
        editor: { text: 'Editor', status: 'Processing' },
        viewer: { text: 'Viewer', status: 'Default' },
      },
      render: (_, user) => (
        <Tag color={user.role === 'admin' ? 'red' : user.role === 'editor' ? 'blue' : 'default'}>
          {user.role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        active: { text: 'Active', status: 'Success' },
        invited: { text: 'Invited', status: 'Warning' },
      },
    },
    { title: 'Created at', dataIndex: 'createdAt', search: false, width: 128 },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'actions',
      render: (_, user) => <UserActions record={user} onEdit={onEdit} onDelete={onDelete} />,
    },
  ];
}
