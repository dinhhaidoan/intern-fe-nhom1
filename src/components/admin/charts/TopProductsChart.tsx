// components/admin/charts/TopProductsChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProductSalesData } from '../../../types';

interface TopProductsChartProps {
  data: ProductSalesData[];
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Top sản phẩm bán chạy</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30 dark:opacity-20" />
            <XAxis 
              dataKey="code"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'sales') return [value, 'Số lượng bán'];
                return [`${(value / 1000000).toFixed(1)}M`, 'Doanh thu'];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return `Mã: ${label} - ${payload[0].payload.name}`;
                }
                return `Mã: ${label}`;
              }}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Bar 
              dataKey="sales" 
              fill="#8b5cf6" 
              name="Số lượng bán"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="revenue" 
              fill="#f59e0b" 
              name="Doanh thu"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};