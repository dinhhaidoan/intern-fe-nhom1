// components/common/Table.tsx
import React, { memo } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

function TableComponent<T extends { id: string }>({ 
  data, 
  columns,
  emptyMessage = 'Không có dữ liệu'
}: TableProps<T>) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr className="text-left">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-4 py-3 font-medium text-gray-600 dark:text-gray-300 ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col, idx) => (
                  <td 
                    key={idx} 
                    className={`px-4 py-3 ${col.className || ''}`}
                  >
                    {col.render 
                      ? col.render(item) 
                      : <span className="text-gray-900 dark:text-white">
                          {String(item[col.accessor as keyof T] || '-')}
                        </span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}

export const Table = memo(TableComponent) as typeof TableComponent;