// components/admin/UserTable.tsx 
import { memo } from 'react';
import { Table } from '../common/Table';
import type { User } from '../../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const UserTable = memo<UserTableProps>(({ 
  users, 
  onEdit, 
  onDelete,
  onToggleStatus 
}) => {
  const columns = [
    {
      header: 'User',
      accessor: 'name',
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-medium">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 dark:text-white truncate">{user.name}</div>
            <div className="text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      render: (user: User) => (
        <button
          onClick={() => onToggleStatus(user.id)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            user.status === 'active' 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50' 
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50'
          }`}
        >
          {user.status}
        </button>
      )
    },
    {
      header: 'Đăng nhập cuối',
      accessor: 'lastLogin',
      render: (user: User) => (
        <span className="text-gray-600 dark:text-gray-400">{user.lastLogin || '-'}</span>
      )
    },
    {
      header: 'Tổng chi tiêu',
      accessor: 'totalSpent',
      className: 'text-right',
      render: (user: User) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {user.totalSpent ? `${(user.totalSpent / 1000000).toFixed(1)}M` : '-'}
        </span>
      )
    },
    {
      header: 'Ngày tạo',
      accessor: 'createdAt',
      render: (user: User) => (
        <span className="text-gray-600 dark:text-gray-400">{user.createdAt}</span>
      )
    },
    {
      header: 'Thao tác',
      accessor: 'id',
      className: 'text-right',
      render: (user: User) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
          >
            Xóa
          </button>
        </div>
      )
    }
  ];

  return <Table data={users} columns={columns} emptyMessage="Không tìm thấy user nào" />;
});