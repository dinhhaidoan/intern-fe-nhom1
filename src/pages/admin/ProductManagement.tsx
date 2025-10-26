// pages/admin/ProductManagement.tsx 
import React, { useState, useMemo, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { ProductTable } from '../../components/admin/ProductTable';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { FilterBar } from '../../components/common/FilterBar';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from 'react-toastify';
import type { Product } from '../../types';

export const ProductManagement: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    searchQuery, 
    setSearchQuery,
    currentUser
  } = useAdminStore();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'sold'>('name');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });

  // Check permissions
  const canCreate = currentUser?.permissions?.products.create !== false;
  const canEdit = currentUser?.permissions?.products.edit !== false;
  const canDelete = currentUser?.permissions?.products.delete !== false;

  // Memoized categories
  const categories = useMemo(() => 
    [...new Set(products.map(p => p.category))],
    [products]
  );

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchSearch && matchCategory;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      if (sortBy === 'sold') return (b.sold || 0) - (a.sold || 0);
      return 0;
    });
  }, [products, searchQuery, filterCategory, sortBy]);

  // Memoized product stats
  const productStats = useMemo(() => ({
    total: products.length,
    lowStock: products.filter(p => p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  }), [products]);

  // Callbacks
  const handleOpenModal = useCallback(() => {
    if (!canCreate) {
      toast.error('Bạn không có quyền tạo sản phẩm');
      return;
    }
    setEditingProduct(null);
    setIsModalOpen(true);
  }, [canCreate]);

  const handleCloseModal = useCallback(() => {
    setEditingProduct(null);
    setIsModalOpen(false);
  }, []);

  const handleEdit = useCallback((product: Product) => {
    if (!canEdit) {
      toast.error('Bạn không có quyền chỉnh sửa sản phẩm');
      return;
    }
    setEditingProduct(product);
    setIsModalOpen(true);
  }, [canEdit]);

  const handleSubmit = useCallback((formData: any) => {
    const { code, name, price, categoryId, stock, description, image, category } = formData;
    const productData = {
      code: code || '',
      name,
      price,
      category: category || '',
      stock,
      description,
      image,
      categoryId
    };
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Cập nhật sản phẩm thành công');
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        sold: 0,
      };
      addProduct(newProduct);
      toast.success('Thêm sản phẩm thành công');
    }
    handleCloseModal();
  }, [editingProduct, updateProduct, addProduct, handleCloseModal]);

  const handleDeleteClick = useCallback((id: string) => {
    if (!canDelete) {
      toast.error('Bạn không có quyền xóa sản phẩm');
      return;
    }
    setDeleteConfirm({ isOpen: true, id });
  }, [canDelete]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirm.id) {
      deleteProduct(deleteConfirm.id);
      toast.success('Xóa sản phẩm thành công');
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm.id, deleteProduct]);

  const filterConfig = useMemo(() => [
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: [
        { label: 'Tất cả danh mục', value: 'all' },
        ...categories.map(cat => ({ label: cat, value: cat }))
      ]
    },
    {
      value: sortBy,
      onChange: setSortBy as (value: string) => void,
      options: [
        { label: 'Sắp xếp: Tên', value: 'name' },
        { label: 'Sắp xếp: Giá', value: 'price' },
        { label: 'Sắp xếp: Tồn kho', value: 'stock' },
        { label: 'Sắp xếp: Đã bán', value: 'sold' },
      ]
    }
  ], [filterCategory, sortBy, categories]);

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản lý Sản phẩm</h1>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {productStats.total} sản phẩm • {productStats.lowStock} sắp hết • {productStats.outOfStock} hết hàng
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={!canCreate}
          >
            + Thêm Sản phẩm
          </button>
        </div>

        {/* Filters */}
        <FilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Tìm kiếm sản phẩm..."
          filters={filterConfig}
        />

        {/* Products Table */}
        <ProductTable
          products={filteredAndSortedProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Các Modal */}
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
        />

        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
          onConfirm={handleDeleteConfirm}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          type="danger"
        />
      </div>
      
    </>
  );
};