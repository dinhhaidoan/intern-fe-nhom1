// src/components/admin/charts/RevenueChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RevenueData } from '../../../types';

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Doanh thu 7 ngày qua</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30 dark:opacity-20" />
            <XAxis 
              dataKey="date" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
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
              formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, 'Doanh thu']}
              labelFormatter={(label) => `Ngày: ${label}`}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#1d4ed8' }}
              name="Doanh thu"
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Số đơn hàng"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};