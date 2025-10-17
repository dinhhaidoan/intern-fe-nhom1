// pages/admin/AdminPage.tsx 
import React, { useEffect } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Dashboard } from './Dashboard';
import { UserManagement } from './UserManagement';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { CategoryManagement } from './CategoryManagement';
import { AdminPermissions } from './AdminPermissions';
import { Reviews } from './Reviews';
import { ShippingUnits } from './ShippingUnits';
import { 
  mockCurrentAdmin, 
  mockAdmins, 
  mockUsers, 
  mockCategories, 
  mockProducts, 
  mockOrders 
} from '../../data/mockData';
import { mockReviews, mockShippingUnits } from '../../data/mockData';

export const AdminPage: React.FC = () => {
  const { 
    selectedTab, 
    setUsers, 
    setAdmins,
    setProducts, 
    setOrders, 
    setCategories,
    setCurrentUser,
    setReviews,
    setShippingUnits
  } = useAdminStore();

  // Khởi tạo mock data
  useEffect(() => {
    setCurrentUser(mockCurrentAdmin);
    setAdmins(mockAdmins);
    setUsers(mockUsers);
    setCategories(mockCategories);
    setProducts(mockProducts);
    setOrders(mockOrders);
    setReviews(mockReviews);
    setShippingUnits(mockShippingUnits);
  }, [setCurrentUser, setAdmins, setUsers, setProducts, setOrders, setCategories, setReviews, setShippingUnits]);

  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'reviews':
        return <Reviews />;
      case 'shipping':
        return <ShippingUnits />;
      case 'orders':
        return <OrderManagement />;
      case 'admins':
        return <AdminPermissions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AdminLayout>
        {renderContent()}
      </AdminLayout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};