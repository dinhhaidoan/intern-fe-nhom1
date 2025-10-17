// components/common/StatsCard.tsx
import { memo } from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  subtextColor?: string;
}

export const StatsCard = memo<StatsCardProps>(({ 
  label, 
  value, 
  subtext,
  subtextColor = 'text-gray-400'
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
      {subtext && (
        <div className={`text-xs mt-1 ${subtextColor}`}>{subtext}</div>
      )}
    </div>
  );
});