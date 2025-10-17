// components/admin/DashboardStats.tsx
import { memo } from 'react';
import { StatsCard } from '../common/StatsCard';

interface DashboardStatsProps {
  activeUsers: number;
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
}

export const DashboardStats = memo<DashboardStatsProps>(({
  activeUsers,
  totalUsers,
  totalRevenue,
  totalOrders,
  pendingOrders,
  totalProducts,
  lowStockProducts
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatsCard
        label="Users Hoạt động"
        value={activeUsers}
        subtext={`/ ${totalUsers} tổng`}
        subtextColor="text-gray-400 dark:text-gray-500"
      />
      
      <StatsCard
        label="Doanh thu"
        value={`${(totalRevenue / 1000000).toFixed(1)}M`}
        subtext="+12.5% tháng này"
        subtextColor="text-green-600 dark:text-green-400"
      />
      
      <StatsCard
        label="Đơn hàng"
        value={totalOrders}
        subtext={`${pendingOrders} chờ xử lý`}
        subtextColor="text-orange-600 dark:text-orange-400"
      />
      
      <StatsCard
        label="Sản phẩm"
        value={totalProducts}
        subtext={`${lowStockProducts} sắp hết`}
        subtextColor="text-red-600 dark:text-red-400"
      />
    </div>
  );
});