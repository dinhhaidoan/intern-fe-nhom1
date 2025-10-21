import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useUIStore } from '../stores/uiStore';
import type { Product } from '../types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { searchQuery } = useUIStore();
  
  const selectedCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || '';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 1000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getAllProducts(),
          productAPI.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, sortBy]);

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('minPrice', range[0].toString());
    newParams.set('maxPrice', range[1].toString());
    setSearchParams(newParams);
  };

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort) {
      newParams.set('sort', sort);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm</h1>
          <p className="text-gray-600">
            Hiển thị {filteredAndSortedProducts.length} trong số {products.length} sản phẩm
            {searchQuery && (
              <span className="font-medium"> cho "{searchQuery}"</span>
            )}
          </p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={[minPrice, maxPrice]}
            onPriceRangeChange={handlePriceRangeChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          <div className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}