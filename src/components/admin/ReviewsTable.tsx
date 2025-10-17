import React, { memo } from 'react';
import type { Review } from '../../types';

interface ReviewsTableProps {
  reviews: Review[];
  onEdit: (r: Review) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: Review['status']) => void;
}

export const ReviewsTable = memo<ReviewsTableProps>(({ reviews, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Mã</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Sản phẩm</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Người đánh giá</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Đánh giá</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {reviews.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#{r.id}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{r.productId}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{r.userName}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{r.rating} ⭐</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${r.status === 'published' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : r.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onEdit(r)} className="text-blue-600 dark:text-blue-400 mr-3">Xem</button>
                  {r.status !== 'published' ? (
                    <button onClick={() => onToggleStatus(r.id, 'published')} className="text-green-600 dark:text-green-400 mr-3">Duyệt</button>
                  ) : (
                    <button onClick={() => onToggleStatus(r.id, 'hidden')} className="text-yellow-600 dark:text-yellow-400 mr-3">Ẩn</button>
                  )}
                  <button onClick={() => onDelete(r.id)} className="text-red-600 dark:text-red-400">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reviews.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">Không có đánh giá</div>
      )}
    </div>
  );
});
