// pages/admin/AdminPermissions.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { AdminPermissionModal } from '../../components/admin/AdminPermissionModal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { User } from '../../types';

export const AdminPermissions: React.FC = () => {
  const { 
    admins, 
    addAdmin, 
    updateAdmin, 
    deleteAdmin, 
    toggleAdminStatus,
    currentUser
  } = useAdminStore();

  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ 
    isOpen: boolean; 
    id: string | null 
  }>({ isOpen: false, id: null });

  // Chỉ full admin mới có quyền quản lý
  const canManage = currentUser?.permissions?.settings.edit !== false;

  const adminStats = useMemo(() => ({
    total: admins.length,
    active: admins.filter(a => a.status === 'active').length,
  }), [admins]);

  const handleOpenModal = useCallback(() => {
    if (!canManage) {
      toast.error('Bạn không có quyền thêm admin');
      return;
    }
    setEditingAdmin(null);
    setIsModalOpen(true);
  }, [canManage]);

  const handleCloseModal = useCallback(() => {
    setEditingAdmin(null);
    setIsModalOpen(false);
  }, []);

  const handleEdit = useCallback((admin: User) => {
    if (!canManage) {
      toast.error('Bạn không có quyền sửa admin');
      return;
    }
    setEditingAdmin(admin);
    setIsModalOpen(true);
  }, [canManage]);

  const handleSubmit = useCallback((data: any) => {
    if (editingAdmin) {
      updateAdmin(editingAdmin.id, data);
      toast.success('Cập nhật admin thành công');
    } else {
      const newAdmin: User = {
        ...data,
        id: Date.now().toString(),
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: '',
      };
      addAdmin(newAdmin);
      toast.success('Thêm admin thành công');
    }
    handleCloseModal();
  }, [editingAdmin, updateAdmin, addAdmin, handleCloseModal]);

  const handleDeleteClick = useCallback((id: string) => {
    if (!canManage) {
      toast.error('Bạn không có quyền xóa admin');
      return;
    }
    if (id === currentUser?.id) {
      toast.error('Không thể xóa tài khoản đang đăng nhập');
      return;
    }
    setDeleteConfirm({ isOpen: true, id });
  }, [canManage, currentUser]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirm.id) {
      deleteAdmin(deleteConfirm.id);
      toast.success('Xóa admin thành công');
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm.id, deleteAdmin]);

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản lý Quyền Admin</h1>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {adminStats.total} admins • {adminStats.active} đang hoạt động
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={!canManage}
          >
            + Thêm Admin
          </button>
        </div>

        {/* Admins Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Admin</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Trạng thái</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Ngày tạo</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Quyền hạn</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-medium">
                          {admin.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white">{admin.name}</div>
                          <div className="text-gray-500 dark:text-gray-400 truncate">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAdminStatus(admin.id)}
                        disabled={admin.id === currentUser?.id || !canManage}
                        className={`px-2 py-0.5 rounded text-xs transition-colors disabled:cursor-not-allowed ${
                          admin.status === 'active' 
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50' 
                            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50'
                        }`}
                      >
                        {admin.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{admin.createdAt}</td>
                    <td className="px-4 py-3">
                      <PermissionBadges permissions={admin.permissions} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(admin)}
                          disabled={!canManage}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium disabled:opacity-50"
                        >
                          Sửa
                        </button>
                        {admin.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDeleteClick(admin.id)}
                            disabled={!canManage}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium disabled:opacity-50"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        <AdminPermissionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingAdmin={editingAdmin}
        />

        {/* Delete Confirm Modal */}
        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
          onConfirm={handleDeleteConfirm}
          title="Xóa admin"
          message="Bạn có chắc muốn xóa admin này không?"
          confirmText="Xóa"
          type="danger"
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

// Component hiển thị quyền
const PermissionBadges: React.FC<{ permissions?: any }> = ({ permissions }) => {
  if (!permissions) return <span className="text-gray-500">-</span>;

  const activePermissions: string[] = [];
  
  if (permissions.users?.view) activePermissions.push('Users');
  if (permissions.products?.view) activePermissions.push('Sản phẩm');
  if (permissions.categories?.view) activePermissions.push('Danh mục');
  if (permissions.orders?.view) activePermissions.push('Đơn hàng');
  if (permissions.settings?.view) activePermissions.push('Cài đặt');

  if (activePermissions.length === 0) {
    return <span className="text-gray-500 text-xs">Không có quyền</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {activePermissions.slice(0, 3).map(perm => (
        <span key={perm} className="px-2 py-0.5 rounded text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          {perm}
        </span>
      ))}
      {activePermissions.length > 3 && (
        <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          +{activePermissions.length - 3}
        </span>
      )}
    </div>
  );
};