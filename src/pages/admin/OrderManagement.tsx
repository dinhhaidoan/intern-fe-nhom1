// pages/admin/OrderManagement.tsx 
import React, { useState, useMemo, useCallback } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { FilterBar } from '../../components/common/FilterBar';
import { StatsCard } from '../../components/common/StatsCard';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import type { Order } from '../../types';
import { toast } from 'react-toastify';
import { ConfirmModal } from '../../components/common/ConfirmModal';

export const OrderManagement: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    deleteOrder, 
    searchQuery, 
    setSearchQuery 
  } = useAdminStore();

  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'total'>('createdAt');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.userName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'all' || order.status === filterStatus;
      return matchSearch && matchStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'total') return b.total - a.total;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [orders, searchQuery, filterStatus, sortBy]);

  const orderStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  }), [orders]);

  // Callbacks
  const handleStatusChange = useCallback((orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  }, [updateOrderStatus]);

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirm.id) {
      deleteOrder(deleteConfirm.id);
      toast.success('Xóa đơn hàng thành công');
      if (selectedOrder?.id === deleteConfirm.id) {
        setSelectedOrder(null);
      }
      setDeleteConfirm({ isOpen: false, id: null });
    }
  }, [deleteConfirm, deleteOrder, selectedOrder]);

  const handleViewDetail = useCallback((order: Order) => {
    setSelectedOrder(order);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const getStatusColor = useCallback((status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'shipped': return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'processing': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default: return 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }, []);

  const filterConfig = useMemo(() => [
    {
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { label: 'Tất cả trạng thái', value: 'all' },
        { label: 'Chờ xử lý', value: 'pending' },
        { label: 'Đang xử lý', value: 'processing' },
        { label: 'Đang giao', value: 'shipped' },
        { label: 'Đã giao', value: 'delivered' },
        { label: 'Đã hủy', value: 'cancelled' },
      ]
    },
    {
      value: sortBy,
      onChange: setSortBy as (value: string) => void,
      options: [
        { label: 'Sắp xếp: Ngày tạo', value: 'createdAt' },
        { label: 'Sắp xếp: Giá trị', value: 'total' },
      ]
    }
  ], [filterStatus, sortBy]);

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản lý Đơn hàng</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {orderStats.total} đơn hàng • {orderStats.pending + orderStats.processing} chờ xử lý • Doanh thu: {(orderStats.totalRevenue / 1000000).toFixed(1)}M
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatsCard label="Chờ xử lý" value={orderStats.pending} />
          <StatsCard label="Đang xử lý" value={orderStats.processing} />
          <StatsCard label="Đang giao" value={orderStats.shipped} />
          <StatsCard label="Đã giao" value={orderStats.delivered} />
          <StatsCard 
            label="Tổng doanh thu" 
            value={`${(orderStats.totalRevenue / 1000000).toFixed(1)}M`} 
          />
        </div>

        {/* Filters */}
        <FilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Tìm kiếm đơn hàng..."
          filters={filterConfig}
        />

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Mã đơn hàng</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Khách hàng</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Sản phẩm</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">Tổng tiền</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Trạng thái</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Ngày đặt</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredAndSortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {order.userName}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs"
                      >
                        {order.products.length} sản phẩm
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                      {(order.total / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-2 py-0.5 rounded text-xs border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                        title='thay đổi trạng thái'
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {order.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteClick(order.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              Không tìm thấy đơn hàng nào
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      </div>
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        type="danger"
      />
      
    </>
  );
};