import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import type { MenuProps } from 'antd';
import type { User } from '@/types';

interface Props {
  record: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}
export function UserActions({ record, onEdit, onDelete }: Props) {
  const items: MenuProps['items'] = [
    { key: 'edit', icon: <EditOutlined />, label: 'Edit', onClick: () => onEdit(record) },
    { type: 'divider' },
    {
      key: 'delete',
      danger: true,
      icon: <DeleteOutlined />,
      label: (
        <Popconfirm title="Delete this user?" onConfirm={() => onDelete(record.id)}>
          Delete
        </Popconfirm>
      ),
    },
  ];
  return (
    <Space size="small">
      <Button type="link" onClick={() => onEdit(record)}>
        Edit
      </Button>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    </Space>
  );
}
