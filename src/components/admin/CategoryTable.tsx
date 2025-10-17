import { memo } from 'react';
import { Table } from '../common/Table';
import type { Category } from '../../types';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const CategoryTable = memo<CategoryTableProps>(({ 
  categories, 
  onEdit, 
  onDelete,
  onToggleStatus 
}) => {
  const columns = [
    {
      header: 'Tên danh mục',
      accessor: 'name',
      render: (category: Category) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">{category.slug}</div>
        </div>
      )
    },
    {
      header: 'Mô tả',
      accessor: 'description',
      render: (category: Category) => (
        <div className="text-gray-600 dark:text-gray-400 truncate max-w-xs">
          {category.description || '-'}
        </div>
      )
    },
    {
      header: 'Số sản phẩm',
      accessor: 'productCount',
      className: 'text-center',
      render: (category: Category) => (
        <span className="px-2 py-0.5 rounded text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          {category.productCount}
        </span>
      )
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      render: (category: Category) => (
        <button
          onClick={() => onToggleStatus(category.id)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            category.status === 'active' 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50' 
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50'
          }`}
        >
          {category.status}
        </button>
      )
    },
    {
      header: 'Ngày tạo',
      accessor: 'createdAt',
      render: (category: Category) => (
        <span className="text-gray-600 dark:text-gray-400">{category.createdAt}</span>
      )
    },
    {
      header: 'Thao tác',
      accessor: 'id',
      className: 'text-right',
      render: (category: Category) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
          >
            Xóa
          </button>
        </div>
      )
    }
  ];

  return <Table data={categories} columns={columns} emptyMessage="Không tìm thấy danh mục nào" />;
});