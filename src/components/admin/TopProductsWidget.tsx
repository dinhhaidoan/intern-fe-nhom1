// components/admin/TopProductsWidget.tsx
import { memo } from 'react';
import type { Product } from '../../types';

interface TopProductsWidgetProps {
  products: Product[];
}

export const TopProductsWidget = memo<TopProductsWidgetProps>(({ products }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
        Sản phẩm bán chạy
      </div>
      <div className="space-y-2">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div 
              key={product.id} 
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-400 dark:text-gray-500 w-5">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {product.category}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {product.sold || 0} đã bán
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Kho: {product.stock}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-xs">
            Chưa có sản phẩm
          </div>
        )}
      </div>
    </div>
  );
});