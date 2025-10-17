// pages/admin/AdminProfile.tsx
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminStore } from '../../stores/adminStore';
import { useToast } from '../../components/common/ToastContext';
import type { AdminPermissions } from '../../types';

interface ProfileFormData {
  name: string;
  email: string;
}

export const AdminProfile: React.FC = () => {
  const { currentUser, updateUser } = useAdminStore();
  const { showToast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
    }
  });

  const onSubmitProfile = useCallback((data: ProfileFormData) => {
    if (currentUser) {
      updateUser(currentUser.id, data);
      showToast('Cập nhật thông tin thành công', 'success');
      setIsEditingProfile(false);
    }
  }, [currentUser, updateUser, showToast]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const permissions = currentUser.permissions || getDefaultPermissions();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Hồ sơ Quản trị viên</h1>

      {/* Profile Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Thông tin cá nhân</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isEditingProfile ? 'Hủy' : 'Chỉnh sửa'}
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { required: 'Tên là bắt buộc' })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email là bắt buộc',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email không hợp lệ'
                    }
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{currentUser.name}</div>
                <div className="text-sm text-gray-500">{currentUser.email}</div>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">
                    {currentUser.role}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    currentUser.status === 'active' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {currentUser.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Permissions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Phân quyền</h2>
        <div className="space-y-4">
          <PermissionSection title="Quản lý Users" permissions={permissions.users} />
          <PermissionSection title="Quản lý Sản phẩm" permissions={permissions.products} />
          <PermissionSection title="Quản lý Danh mục" permissions={permissions.categories} />
          <PermissionSection title="Quản lý Đơn hàng" permissions={permissions.orders} />
          <PermissionSection title="Cài đặt" permissions={permissions.settings} />
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          <ActivityItem 
            action="Đăng nhập hệ thống" 
            time={currentUser.lastLogin || 'N/A'} 
          />
          <ActivityItem 
            action="Tạo tài khoản" 
            time={currentUser.createdAt} 
          />
        </div>
      </div>
    </div>
  );
};

interface PermissionSectionProps {
  title: string;
  permissions: Record<string, boolean>;
}

const PermissionSection: React.FC<PermissionSectionProps> = ({ title, permissions }) => {
  const permissionLabels: Record<string, string> = {
    view: 'Xem',
    create: 'Tạo',
    edit: 'Sửa',
    delete: 'Xóa',
  };

  return (
    <div className="border-b border-gray-200 pb-4 last:border-0">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(permissions).map(([key, value]) => (
          <span
            key={key}
            className={`px-2 py-1 rounded text-xs ${
              value 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            {permissionLabels[key] || key}: {value ? '✓' : '✕'}
          </span>
        ))}
      </div>
    </div>
  );
};

interface ActivityItemProps {
  action: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ action, time }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-900">{action}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
};

const getDefaultPermissions = (): AdminPermissions => ({
  users: { view: true, create: true, edit: true, delete: true },
  products: { view: true, create: true, edit: true, delete: true },
  categories: { view: true, create: true, edit: true, delete: true },
  orders: { view: true, edit: true, delete: true },
  settings: { view: true, edit: true },
});