import { FiShoppingCart, FiUser, FiMenu, FiSearch, FiX, FiLogOut, FiSettings } from 'react-icons/fi';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { itemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { 
    mobileMenuOpen, 
    searchQuery,
    setMobileMenuOpen, 
    setSearchQuery,
    toggleMobileMenu,
    toggleCart 
  } = useUIStore();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link to="/home" className="flex-shrink-0 flex items-center ml-4 md:ml-0">
              <h1 className="text-2xl font-bold text-blue-600">ShopStore</h1>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <Link to="/home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Trang chủ
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sản phẩm
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Giới thiệu
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Liên hệ
              </Link>
            </nav>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden sm:block">
                  Xin chào, {user?.name}
                </span>
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/user'}
                  className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
                  title="Dashboard"
                >
                  <FiSettings size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 p-2 rounded-md transition-colors"
                  title="Đăng xuất"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/auth/login" className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors">
                <FiUser size={20} />
              </Link>
            )}

            <button
              onClick={toggleCart}
              className="relative text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
            >
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <div className="mb-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Link
                to="/home"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
              
              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-gray-500 text-sm px-3 mb-2">Xin chào, {user?.name}</p>
                    <Link
                      to={user?.role === 'admin' ? '/admin' : '/user'}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}