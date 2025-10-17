import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { productAPI } from '../services/productService';
import { useCartStore } from '../stores/cartStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Product } from '../types/product';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await productAPI.getProduct(Number(id));
        setProduct(productData);
        
        const related = await productAPI.getProductsByCategory(productData.category);
        setRelatedProducts(related.filter((p: Product) => p.id !== productData.id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <FiArrowLeft className="mr-2" size={20} />
          Quay lại sản phẩm
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <div className="w-full flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="100%" height="100%" fill="#f3f4f6"/><circle cx="100" cy="70" r="50" fill="#d1d5db"/></svg>'); }}
                  className="max-w-full max-h-[520px] object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating.count} đánh giá)</span>
              </div>

              <div>
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Mô tả</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Số lượng:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-md">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiShoppingCart size={20} />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiHeart size={20} />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Miễn phí vận chuyển</h4>
                    <p className="text-sm text-gray-600">Đơn hàng trên $50</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Đổi trả</h4>
                    <p className="text-sm text-gray-600">Trong 30 ngày</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Bảo hành</h4>
                    <p className="text-sm text-gray-600">12 tháng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-blue-600 font-bold">${relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}