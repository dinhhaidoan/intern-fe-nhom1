import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AuthRedirect from '../components/auth/AuthRedirect';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AboutPage from '../pages/users/About/AboutPage';
import ContactPage from '../pages/users/Contact/ContactPage';
import CheckoutPage from '../pages/users/Checkout/CheckoutPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

import LoginPage from '../pages/authentication/LoginPage';
import RegisterPage from '../pages/authentication/RegisterPage';
import ForgotPasswordPage from '../pages/authentication/ForgotPasswordPage';
import VerifyOTPPage from '../pages/authentication/VerifyOTPPage';
import ResetPasswordPage from '../pages/authentication/ResetPasswordPage';
import { AdminPage } from '../pages/admin/AdminPage';
import UserProfilePage from '../pages/users/UserProfilePage';


export default function MainRouter() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <AuthRedirect /> : <Navigate to="/auth/login" />} />
        
        <Route path="/auth/login" element={
          isAuthenticated ? <AuthRedirect /> : <LoginPage />
        } />
        <Route path="/auth/register" element={
          isAuthenticated ? <AuthRedirect /> : <RegisterPage />
        } />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute requiredRole="user">
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/user/profile" element={
          <ProtectedRoute requiredRole="user">
            <Layout>
              <UserProfilePage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/home" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        
        <Route path="/products" element={
          <Layout>
            <ProductsPage />
          </Layout>
        } />
        
        <Route path="/products/:id" element={
          <Layout>
            <ProductDetailPage />
          </Layout>
        } />
        
        <Route path="/about" element={
          <Layout>
            <AboutPage />
          </Layout>
        } />
        
        <Route path="/contact" element={
          <Layout>
            <ContactPage />
          </Layout>
        } />
        
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Layout>
              <CheckoutPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}