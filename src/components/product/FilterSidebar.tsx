import { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { useUIStore } from '../../stores/uiStore';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange
}: FilterSidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handlePriceChange = () => {
    onPriceRangeChange([minPrice, maxPrice]);
  };

  const resetFilters = () => {
    onCategoryChange('');
    onPriceRangeChange([0, 1000]);
    onSortChange('');
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Xóa tất cả
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sắp xếp theo</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Mặc định</option>
          <option value="price-asc">Giá: Thấp đến cao</option>
          <option value="price-desc">Giá: Cao đến thấp</option>
          <option value="rating">Đánh giá cao nhất</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Danh mục</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Tất cả</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Khoảng giá</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Từ"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Đến"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <FiFilter size={20} />
      </button>

      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          {sidebarContent}
        </div>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}