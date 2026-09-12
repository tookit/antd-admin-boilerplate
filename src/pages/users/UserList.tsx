import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Drawer, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { deleteUser, getUserList, saveUser } from '@/api/modules/user.api';
import type { UserListParams } from '@/api/modules/user.api';
import { useProTable } from '@/hooks/useProTable';
import type { User, UserFormValues } from '@/types';
import { useUserTableColumns } from './UserColumn';

const ROLE_OPTIONS = (['admin', 'editor', 'viewer'] as const).map((value) => ({
  value,
  label: value,
}));

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'invited', label: 'Invited' },
];

const DEFAULT_USER: UserFormValues = { name: '', email: '', role: 'viewer', status: 'invited' };

export default function UserList() {
  const [form] = Form.useForm<UserFormValues>();
  const [editing, setEditing] = useState<User>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { message } = App.useApp();

  const { actionRef, defaultProTableProps } = useProTable<User, UserListParams>({
    fetchData: getUserList,
    headerTitle: 'User Management',
  });

  const openEditor = (user?: User) => {
    setEditing(user);
    form.resetFields();
    if (user) form.setFieldsValue(user);
    setDrawerOpen(true);
  };

  const remove = async (id: number) => {
    await deleteUser(id);
    void message.success('User removed');
    await actionRef.current?.reload();
  };

  const save = async (values: UserFormValues) => {
    await saveUser({ ...values, id: editing?.id });
    void message.success(editing ? 'User updated' : 'User added');
    setDrawerOpen(false);
    await actionRef.current?.reload();
  };

  const columns = useUserTableColumns({ onEdit: openEditor, onDelete: (id) => void remove(id) });

  return (
    <div className="page-users">
      <ProTable<User>
        {...defaultProTableProps}
        columns={columns}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>
            New User
          </Button>,
        ]}
      />

      <Drawer
        title={editing ? 'Edit user' : 'New user'}
        open={drawerOpen}
        width={420}
        onClose={() => setDrawerOpen(false)}
        extra={
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={DEFAULT_USER}
          onFinish={(values) => void save(values)}
        >
          <Form.Item label="Display name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select options={ROLE_OPTIONS} />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select options={STATUS_OPTIONS} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
