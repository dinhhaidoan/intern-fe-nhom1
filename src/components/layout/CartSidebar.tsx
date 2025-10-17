import { FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const { cartOpen, setCartOpen } = useUIStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Giỏ hàng</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {items.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setCartOpen(false)}
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500">${item.product.price}</p>
                      
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="mt-1 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Tổng cộng</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setCartOpen(false)}
              >
                Thanh toán
              </Link>
              <Link
                to="/products"
                className="block w-full mt-2 bg-gray-100 text-gray-900 text-center px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setCartOpen(false)}
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}