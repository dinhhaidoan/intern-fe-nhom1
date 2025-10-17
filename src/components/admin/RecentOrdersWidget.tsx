// components/admin/RecentOrdersWidget.tsx
import { memo } from 'react';
import type { Order } from '../../types';

interface RecentOrdersWidgetProps {
  orders: Order[];
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'delivered': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    case 'shipped': return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'processing': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    case 'cancelled': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    default: return 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
  }
};

export const RecentOrdersWidget = memo<RecentOrdersWidgetProps>(({ orders }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
        Đơn hàng gần đây
      </div>
      <div className="space-y-2">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order.id} 
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  #{order.id}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {order.userName}
                </div>
              </div>
              <div className="text-xs font-medium text-gray-900 dark:text-white mx-3">
                {(order.total / 1000000).toFixed(1)}M
              </div>
              <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-xs">
            Chưa có đơn hàng
          </div>
        )}
      </div>
    </div>
  );
});