import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCcw } from 'react-icons/fi';
import type { Product } from '../types/product';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getLimitedProducts(8),
          productAPI.getCategories()
        ]);
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Chào mừng đến với ShopStore
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-3xl mx-auto">
              Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mua sắm ngay
                <FiArrowRight className="ml-2" size={20} />
              </Link>

              <div className="max-w-md w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-6 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Giao hàng miễn phí</h3>
              <p className="text-gray-600">Miễn phí giao hàng cho đơn hàng trên $50</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thanh toán bảo mật</h3>
              <p className="text-gray-600">Giao dịch được mã hóa và bảo mật 100%</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiRefreshCcw className="text-purple-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Đổi trả dễ dàng</h3>
              <p className="text-gray-600">Đổi trả trong vòng 30 ngày</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-orange-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sản phẩm chất lượng</h3>
              <p className="text-gray-600">Cam kết 100% hàng chính hãng</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục sản phẩm</h2>
            <p className="text-gray-600">Khám phá các danh mục sản phẩm đa dạng</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600">Những sản phẩm được yêu thích nhất</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Xem tất cả sản phẩm
              <FiArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin khuyến mãi</h2>
          <p className="text-blue-100 mb-8">Nhận thông tin về các sản phẩm mới và ưu đãi đặc biệt</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-purple-600 text-white px-6 py-3 rounded-r-lg hover:bg-purple-700 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}