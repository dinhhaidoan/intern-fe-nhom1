// src/components/admin/charts/UserGrowthChart.tsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UserGrowthData } from '../../../types';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Tăng trưởng người dùng</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="users" 
              stackId="1"
              stroke="#ef4444" 
              fill="#fecaca" 
              name="Tổng users"
            />
            <Area 
              type="monotone" 
              dataKey="newUsers" 
              stackId="2"
              stroke="#10b981" 
              fill="#a7f3d0" 
              name="Users mới"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};