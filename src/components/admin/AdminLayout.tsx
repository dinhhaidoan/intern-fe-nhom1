// components/admin/AdminLayout.tsx 
import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { selectedTab, setSelectedTab, currentUser } = useAdminStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', permission: true },
    { id: 'users', label: 'Khách hàng', permission: currentUser?.permissions?.users.view !== false },
    { id: 'products', label: 'Sản phẩm', permission: currentUser?.permissions?.products.view !== false },
    { id: 'categories', label: 'Danh mục', permission: currentUser?.permissions?.categories.view !== false },
    { id: 'reviews', label: 'Đánh giá', permission: currentUser?.permissions?.reviews?.view !== false },
    { id: 'orders', label: 'Đơn hàng', permission: currentUser?.permissions?.orders.view !== false },
    { id: 'shipping', label: 'Đơn vị vận chuyển', permission: currentUser?.permissions?.shipping?.view !== false },
    { id: 'admins', label: 'Quyền Admin', permission: currentUser?.permissions?.settings.view !== false },
  ].filter(item => item.permission);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-52 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">Admin Panel</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quản lý Ecommerce</p>
        </div>
        
        <nav className="p-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors mb-1 ${
                selectedTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="absolute bottom-16 left-0 right-0 p-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Thông tin admin + Logout */}
        {currentUser && (
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-medium">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
              </div>

              {/* Logout button */}
              <div className="ml-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nội dung chính */}
      <div className="ml-52 p-6 min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// Small logout button placed in the admin sidebar
function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handle = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <button
      onClick={handle}
      title="Đăng xuất"
      className="p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {/* simple text/icon - avoid adding new dep; using emoji here for compactness */}
      🔓
    </button>
  );
}