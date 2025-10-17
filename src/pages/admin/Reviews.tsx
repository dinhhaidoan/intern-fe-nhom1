import React, { useState, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import type { Review } from '../../types';
import { FilterBar } from '../../components/common/FilterBar';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Modal } from '../../components/common/Modal';
import { ReviewsTable } from '../../components/admin/ReviewsTable';

export const Reviews: React.FC = () => {
  const { reviews, setReviews } = useAdminStore();
  const [viewing, setViewing] = useState<Review | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const handleView = useCallback((r: Review) => setViewing(r), []);

  const handleToggle = useCallback((id: string, status: Review['status']) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
  }, [reviews, setReviews]);

  const handleDelete = useCallback((id: string) => setDeleteConfirm({ isOpen: true, id }), []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm.id) {
      setReviews(reviews.filter(r => r.id !== deleteConfirm.id));
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm, reviews, setReviews]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Đánh giá</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quản lý đánh giá sản phẩm</div>
        </div>
      </div>

      <FilterBar searchValue={''} onSearchChange={() => {}} />

      <ReviewsTable
        reviews={reviews}
        onEdit={handleView}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
      />

      <Modal isOpen={!!viewing} onClose={() => setViewing(null)} title={viewing ? `Đánh giá #${viewing.id}` : ''} size="md">
        {viewing && (
          <div className="space-y-3">
            <div className="text-sm text-gray-800 dark:text-white">Người đánh giá: {viewing.userName}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Sản phẩm: {viewing.productId}</div>
            <div className="text-sm text-gray-700 dark:text-gray-200">{viewing.comment}</div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Xóa đánh giá"
        message="Bạn có chắc muốn xóa đánh giá này?"
        confirmText="Xóa"
        type="danger"
      />
    </div>
  );
};
