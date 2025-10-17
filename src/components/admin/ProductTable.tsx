// components/admin/ProductTable.tsx
import { memo, useCallback } from 'react';
import { Table } from '../common/Table';
import type { Product } from '../../types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductTable = memo<ProductTableProps>(({ 
  products, 
  onEdit, 
  onDelete 
}) => {
  const handleDelete = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  const columns = [
    {
      header: 'Mã SP',
      accessor: 'code',
      className: 'whitespace-nowrap',
      render: (product: Product) => (
        <span className="font-mono text-gray-500 dark:text-gray-400 rounded">
          #{product.code}
        </span>
      )
    },
    {
      header: 'Sản phẩm',
      accessor: 'name',
      render: (product: Product) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
            ) : 'IMG'}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 dark:text-white truncate">{product.name}</div>
            <div className="text-gray-500 dark:text-gray-400 truncate text-xs">
              {product.description || 'Không có mô tả'}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Danh mục',
      accessor: 'category',
      render: (product: Product) => (
        <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {product.category}
        </span>
      )
    },
    {
      header: 'Giá',
      accessor: 'price',
      className: 'text-right',
      render: (product: Product) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {(product.price / 1000000).toFixed(1)}M
        </span>
      )
    },
    {
      header: 'Tồn kho',
      accessor: 'stock',
      className: 'text-right',
      render: (product: Product) => (
        <span className={`px-2 py-0.5 rounded text-xs ${
          product.stock === 0 
            ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
            : product.stock < 10
            ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
            : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        }`}>
          {product.stock}
        </span>
      )
    },
    {
      header: 'Đã bán',
      accessor: 'sold',
      className: 'text-right',
      render: (product: Product) => (
        <span className="text-gray-600 dark:text-gray-400">{product.sold || 0}</span>
      )
    },
    {
      header: 'Thao tác',
      accessor: 'id',
      className: 'text-right',
      render: (product: Product) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
          >
            Sửa
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
          >
            Xóa
          </button>
        </div>
      )
    }
  ];

  return <Table data={products} columns={columns} emptyMessage="Không tìm thấy sản phẩm nào" />;
});