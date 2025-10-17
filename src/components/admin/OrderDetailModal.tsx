// components/admin/OrderDetailModal.tsx
import React, { memo } from 'react';
import { Modal } from '../common/Modal';
import type { Order } from '../../types';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailModal = memo<OrderDetailModalProps>(({ order, onClose }) => {
  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'shipped': return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'processing': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default: return 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Modal
      isOpen={!!order}
      onClose={onClose}
      title={`Chi tiết đơn hàng #${order.id}`}
      size="lg"
    >
      <div className="space-y-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Ngày đặt</div>
            <div className="text-sm text-gray-900 dark:text-white">{order.createdAt}</div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Khách hàng</div>
            <div className="text-sm text-gray-900 dark:text-white">{order.userName}</div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-2">Trạng thái</div>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>
        
        <div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Sản phẩm</div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-left">
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">Sản phẩm</th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300 text-center">SL</th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300 text-right">Đơn giá</th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {order.products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{product.name}</td>
                    <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{product.quantity}</td>
                    <td className="px-3 py-2 text-right text-gray-900 dark:text-white">
                      {(product.price / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-white">
                      {(product.price * product.quantity / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Tổng cộng</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {(order.total / 1000000).toFixed(1)}M VNĐ
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});