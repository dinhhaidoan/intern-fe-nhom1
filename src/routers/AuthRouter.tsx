import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/authentication/LoginPage';
import RegisterPage from '../pages/authentication/RegisterPage';
import ForgotPasswordPage from '../pages/authentication/ForgotPasswordPage';
import VerifyOTPPage from '../pages/authentication/VerifyOTPPage';
import ResetPasswordPage from '../pages/authentication/ResetPasswordPage';

const AuthRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRouter;