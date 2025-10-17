// components/admin/AdminPermissionModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import type { User, AdminPermissions } from '../../types';

interface AdminPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingAdmin: User | null;
}

export const AdminPermissionModal: React.FC<AdminPermissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingAdmin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [permissions, setPermissions] = useState<AdminPermissions>({
    users: { view: false, create: false, edit: false, delete: false },
    products: { view: false, create: false, edit: false, delete: false },
    categories: { view: false, create: false, edit: false, delete: false },
    orders: { view: false, edit: false, delete: false },
    settings: { view: false, edit: false },
  });

  useEffect(() => {
    if (editingAdmin) {
      setFormData({
        name: editingAdmin.name,
        email: editingAdmin.email,
        password: '',
      });
      setPermissions(editingAdmin.permissions || getDefaultPermissions());
    } else {
      setFormData({ name: '', email: '', password: '' });
      setPermissions(getDefaultPermissions());
    }
  }, [editingAdmin]);

  const handlePermissionChange = (section: string, action: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof AdminPermissions],
        [action]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onSubmit({ ...formData, permissions });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingAdmin ? 'Sửa quyền Admin' : 'Thêm Admin'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập tên admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        {/* Phân quyền */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Phân quyền</h3>
          
          <div className="space-y-3">
            <PermissionRow
              title="Quản lý Users"
              section="users"
              permissions={permissions.users}
              onChange={handlePermissionChange}
              actions={['view', 'create', 'edit', 'delete']}
            />
            
            <PermissionRow
              title="Quản lý Sản phẩm"
              section="products"
              permissions={permissions.products}
              onChange={handlePermissionChange}
              actions={['view', 'create', 'edit', 'delete']}
            />
            
            <PermissionRow
              title="Quản lý Danh mục"
              section="categories"
              permissions={permissions.categories}
              onChange={handlePermissionChange}
              actions={['view', 'create', 'edit', 'delete']}
            />
            
            <PermissionRow
              title="Quản lý Đơn hàng"
              section="orders"
              permissions={permissions.orders}
              onChange={handlePermissionChange}
              actions={['view', 'edit', 'delete']}
            />
            
            <PermissionRow
              title="Cài đặt"
              section="settings"
              permissions={permissions.settings}
              onChange={handlePermissionChange}
              actions={['view', 'edit']}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {editingAdmin ? 'Cập nhật' : 'Thêm'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};

interface PermissionRowProps {
  title: string;
  section: string;
  permissions: Record<string, boolean>;
  onChange: (section: string, action: string, value: boolean) => void;
  actions: string[];
}

const PermissionRow: React.FC<PermissionRowProps> = ({
  title,
  section,
  permissions,
  onChange,
  actions
}) => {
  const actionLabels: Record<string, string> = {
    view: 'Xem',
    create: 'Tạo',
    edit: 'Sửa',
    delete: 'Xóa',
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-40">{title}</span>
      <div className="flex gap-4">
        {actions.map(action => (
          <label key={action} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions[action] || false}
              onChange={(e) => onChange(section, action, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{actionLabels[action]}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const getDefaultPermissions = (): AdminPermissions => ({
  users: { view: false, create: false, edit: false, delete: false },
  products: { view: false, create: false, edit: false, delete: false },
  categories: { view: false, create: false, edit: false, delete: false },
  orders: { view: false, edit: false, delete: false },
  settings: { view: false, edit: false },
});