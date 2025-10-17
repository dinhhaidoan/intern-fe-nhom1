// src/pages/admin/Dashboard.tsx
import React, { useMemo } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { RecentOrdersWidget } from '../../components/admin/RecentOrdersWidget';
import { TopProductsWidget } from '../../components/admin/TopProductsWidget';
import { RevenueChart } from '../../components/admin/charts/RevenueChart';
import { TopProductsChart } from '../../components/admin/charts/TopProductsChart';
import { UserGrowthChart } from '../../components/admin/charts/UserGrowthChart';
import type { RevenueData, ProductSalesData, UserGrowthData } from '../../types';

export const Dashboard: React.FC = () => {
  const { users, products, orders } = useAdminStore();

  // Stats data 
  const stats = useMemo(() => ({
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    lowStock: products.filter(p => p.stock < 10).length,
    pendingOrders: orders.filter(o => 
      o.status === 'pending' || o.status === 'processing'
    ).length,
  }), [users, products, orders]);

  // Data for charts
  const revenueData: RevenueData[] = useMemo(() => {
    // Mock data - thay bằng API thật sau
    return [
      { date: '01/10', revenue: 4500000, orders: 12 },
      { date: '02/10', revenue: 5200000, orders: 15 },
      { date: '03/10', revenue: 4800000, orders: 14 },
      { date: '04/10', revenue: 6100000, orders: 18 },
      { date: '05/10', revenue: 5800000, orders: 16 },
      { date: '06/10', revenue: 7200000, orders: 22 },
      { date: '07/10', revenue: 6800000, orders: 20 },
    ];
  }, []);

  const topProductsData: ProductSalesData[] = useMemo(() => {
    return products.slice(0, 5).map(product => ({
      code: product.code,
      name: product.name,
      sales: product.sold || 0,
      revenue: (product.sold || 0) * product.price,
    }));
  }, [products]);

  const userGrowthData: UserGrowthData[] = useMemo(() => {
    // Mock data - thay bằng API thật sau
    return [
      { date: '01/10', users: 150, newUsers: 15 },
      { date: '02/10', users: 165, newUsers: 12 },
      { date: '03/10', users: 177, newUsers: 18 },
      { date: '04/10', users: 195, newUsers: 20 },
      { date: '05/10', users: 215, newUsers: 22 },
      { date: '06/10', users: 237, newUsers: 25 },
      { date: '07/10', users: 262, newUsers: 28 },
    ];
  }, []);

  const recentOrders = useMemo(() => 
    orders.slice(-5).reverse(), 
    [orders]
  );
  
  const topProducts = useMemo(() => 
    [...products]
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 5),
    [products]
  );

  const activeUsersWithLogin = useMemo(() => 
    users.filter(u => u.lastLogin).slice(0, 5),
    [users]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      {/* Stats Cards - Component này cần được cập nhật dark mode */}
      <DashboardStats
        activeUsers={stats.activeUsers}
        totalUsers={users.length}
        totalRevenue={stats.totalRevenue}
        totalOrders={orders.length}
        pendingOrders={stats.pendingOrders}
        totalProducts={products.length}
        lowStockProducts={stats.lowStock}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <TopProductsChart data={topProductsData} />
      </div>

      {/* Second Row - User Growth and Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserGrowthChart data={userGrowthData} />
        </div>
        <div className="space-y-6">
          <RecentOrdersWidget orders={recentOrders} />
          <TopProductsWidget products={topProducts} />
        </div>
      </div>

      {/* User Activity Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
          Hoạt động user gần đây
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="border-b border-gray-200 dark:border-gray-600">
              <tr className="text-left">
                <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">User</th>
                <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">Đăng nhập cuối</th>
                <th className="pb-2 font-medium text-gray-600 dark:text-gray-400 text-right">
                  Tổng chi tiêu
                </th>
              </tr>
            </thead>
            <tbody>
              {activeUsersWithLogin.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="py-2 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="py-2 text-gray-500 dark:text-gray-500">{user.lastLogin}</td>
                  <td className="py-2 text-gray-900 dark:text-white text-right font-medium">
                    {user.totalSpent 
                      ? `${(user.totalSpent / 1000000).toFixed(1)}M` 
                      : '-'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {activeUsersWithLogin.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-xs">
              Chưa có hoạt động
            </div>
          )}
        </div>
      </div>
    </div>
  );
};