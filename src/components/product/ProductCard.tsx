import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const imgPlaceholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
    '<rect width="100%" height="100%" fill="#f3f4f6"/>' +
    '<circle cx="100" cy="70" r="50" fill="#d1d5db"/>' +
    '</svg>'
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden p-5 flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = imgPlaceholder)}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={16}
              className={i < Math.floor(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({product.rating.count})</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
        <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
          {product.title}
        </Link>
      </h3>

      <Link to={`/products/${product.id}`} className="text-sm text-blue-600 font-medium">
        {product.category}
      </Link>

      <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>

      <div className="w-full flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.id}`}
            className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            Xem
          </Link>

          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
            aria-label={`Thêm ${product.title} vào giỏ`}
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}