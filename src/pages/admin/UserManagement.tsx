// pages/admin/UserManagement.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { UserTable } from '../../components/admin/UserTable';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { FilterBar } from '../../components/common/FilterBar';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from 'react-toastify';
import type { User } from '../../types';

export const UserManagement: React.FC = () => {
  const { 
    users, 
    addUser, 
    updateUser, 
    deleteUser, 
    toggleUserStatus, 
    searchQuery, 
    setSearchQuery,
    currentUser
  } = useAdminStore();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'totalSpent'>('createdAt');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<{ 
    isOpen: boolean; 
    id: string | null 
  }>({ isOpen: false, id: null });

  // Check quyền
  const canCreate = currentUser?.permissions?.users.create !== false;
  const canEdit = currentUser?.permissions?.users.edit !== false;
  const canDelete = currentUser?.permissions?.users.delete !== false;

  // Lọc và sắp xếp users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchSearch && matchStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'totalSpent') return (b.totalSpent || 0) - (a.totalSpent || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [users, searchQuery, sortBy, filterStatus]);

  // Thống kê
  const userStats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
  }), [users]);

  // Xử lý
  const handleOpenModal = useCallback(() => {
    if (!canCreate) {
      toast.error('Bạn không có quyền thêm user');
      return;
    }
    setEditingUser(null);
    setIsModalOpen(true);
  }, [canCreate]);

  const handleCloseModal = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(false);
  }, []);

  const handleEdit = useCallback((user: User) => {
    if (!canEdit) {
      toast.error('Bạn không có quyền sửa user');
      return;
    }
    setEditingUser(user);
    setIsModalOpen(true);
  }, [canEdit]);

  const handleSubmit = useCallback((data: { name: string; email: string; password?: string }) => {
    if (editingUser) {
      const updateData = data.password 
      ? { ...data, password: data.password }
      : { name: data.name, email: data.email };
    
    updateUser(editingUser.id, updateData);
    toast.success('Cập nhật user thành công');
    } else {
      const newUser: User = {
        ...data,
        id: Date.now().toString(),
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        totalSpent: 0,
      };
      addUser(newUser);
      toast.success('Thêm user thành công');
    }
    handleCloseModal();
  }, [editingUser, updateUser, addUser, handleCloseModal]);

  const handleDeleteClick = useCallback((id: string) => {
    if (!canDelete) {
      toast.error('Bạn không có quyền xóa user');
      return;
    }
    setDeleteConfirm({ isOpen: true, id });
  }, [canDelete]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirm.id) {
      deleteUser(deleteConfirm.id);
      toast.success('Xóa user thành công');
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm.id, deleteUser]);

  const filterConfig = useMemo(() => [
    {
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { label: 'Tất cả trạng thái', value: 'all' },
        { label: 'Hoạt động', value: 'active' },
        { label: 'Không hoạt động', value: 'inactive' },
      ]
    },
    {
      value: sortBy,
      onChange: setSortBy as (value: string) => void,
      options: [
        { label: 'Sắp xếp: Ngày tạo', value: 'createdAt' },
        { label: 'Sắp xếp: Tên', value: 'name' },
        { label: 'Sắp xếp: Chi tiêu', value: 'totalSpent' },
      ]
    }
  ], [filterStatus, sortBy]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản lý Users</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {userStats.total} users • {userStats.active} hoạt động
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
          disabled={!canCreate}
        >
          + Thêm User
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm users..."
        filters={filterConfig}
      />

      {/* Users Table */}
      <UserTable
        users={filteredAndSortedUsers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onToggleStatus={toggleUserStatus}
      />

      {/* Các Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Xóa user"
        message="Bạn có chắc muốn xóa user này không?"
        confirmText="Xóa"
        type="danger"
      />
    </div>
  );
};