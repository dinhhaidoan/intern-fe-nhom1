import { memo } from 'react';
import type { ShippingUnit } from '../../types';

interface Props {
  units: ShippingUnit[];
  onEdit: (u: ShippingUnit) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const ShippingUnitsTable = memo<Props>(({ units, onEdit, onDelete, onToggleActive }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Tên</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Mã</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Phí</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Thời gian</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {units.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{u.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{u.code}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{(u.price/1000).toFixed(0)}k</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{u.estimatedDays || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${u.active ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'}`}>
                    {u.active ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onEdit(u)} className="text-blue-600 dark:text-blue-400 mr-3">Sửa</button>
                  <button onClick={() => onToggleActive(u.id)} className="text-yellow-600 dark:text-yellow-400 mr-3">Bật/Tắt</button>
                  <button onClick={() => onDelete(u.id)} className="text-red-600 dark:text-red-400">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {units.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">Không có đơn vị vận chuyển</div>
      )}
    </div>
  );
});
