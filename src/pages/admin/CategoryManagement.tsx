// pages/admin/CategoryManagement.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { CategoryTable } from '../../components/admin/CategoryTable';
import { CategoryFormModal } from '../../components/admin/CategoryFormModal';
import { FilterBar } from '../../components/common/FilterBar';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from 'react-toastify';
import type { Category } from '../../types';

export const CategoryManagement: React.FC = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    toggleCategoryStatus,
    searchQuery, 
    setSearchQuery,
    currentUser
  } = useAdminStore();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'productCount' | 'createdAt'>('createdAt');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });

  // Check permissions
  const canCreate = currentUser?.permissions?.categories.create !== false;
  const canEdit = currentUser?.permissions?.categories.edit !== false;
  const canDelete = currentUser?.permissions?.categories.delete !== false;

  // Memoized filtered and sorted categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      const matchSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'all' || category.status === filterStatus;
      return matchSearch && matchStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'productCount') return b.productCount - a.productCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [categories, searchQuery, filterStatus, sortBy]);

  // Memoized category stats
  const categoryStats = useMemo(() => ({
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    totalProducts: categories.reduce((sum, c) => sum + c.productCount, 0),
  }), [categories]);

  // Callbacks
  const handleOpenModal = useCallback(() => {
    if (!canCreate) {
      toast.error('Bạn không có quyền tạo danh mục');
      return;
    }
    setEditingCategory(null);
    setIsModalOpen(true);
  }, [canCreate]);

  const handleCloseModal = useCallback(() => {
    setEditingCategory(null);
    setIsModalOpen(false);
  }, []);

  const handleEdit = useCallback((category: Category) => {
    if (!canEdit) {
      toast.error('Bạn không có quyền chỉnh sửa danh mục');
      return;
    }
    setEditingCategory(category);
    setIsModalOpen(true);
  }, [canEdit]);

  const handleSubmit = useCallback((data: { name: string; slug: string; description: string }) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, data);
      toast.success('Cập nhật danh mục thành công');
    } else {
      const newCategory: Category = {
        ...data,
        id: Date.now().toString(),
        status: 'active',
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      addCategory(newCategory);
      toast.success('Thêm danh mục thành công');
    }
    handleCloseModal();
  }, [editingCategory, updateCategory, addCategory, handleCloseModal]);

  const handleDeleteClick = useCallback((id: string) => {
    if (!canDelete) {
      toast.error('Bạn không có quyền xóa danh mục');
      return;
    }
    setDeleteConfirm({ isOpen: true, id });
  }, [canDelete]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirm.id) {
      deleteCategory(deleteConfirm.id);
      toast.success('Xóa danh mục thành công');
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm.id, deleteCategory]);

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
        { label: 'Sắp xếp: Số sản phẩm', value: 'productCount' },
      ]
    }
  ], [filterStatus, sortBy]);

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản lý Danh mục</h1>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {categoryStats.total} danh mục • {categoryStats.active} hoạt động • {categoryStats.totalProducts} sản phẩm
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={!canCreate}
          >
            + Thêm Danh mục
          </button>
        </div>

        {/* Filters */}
        <FilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Tìm kiếm danh mục..."
          filters={filterConfig}
        />

        {/* Categories Table */}
        <CategoryTable
          categories={filteredAndSortedCategories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onToggleStatus={toggleCategoryStatus}
        />

        {/* Form Modal */}
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
        />

        {/* Delete Confirm Modal */}
        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
          onConfirm={handleDeleteConfirm}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          type="danger"
        />
      </div>
      
    </>
  );
};