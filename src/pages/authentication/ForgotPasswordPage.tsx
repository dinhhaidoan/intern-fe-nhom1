import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from '../../components/authentication/AuthLayout';
import FormInput from '../../components/authentication/FormInput';
import { useFormValidation, ValidationRules } from '../../hooks/useFormValidation';
import type { ForgotPasswordFormData } from '../../types/auth';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validationRules = {
    email: [
      ValidationRules.required('Email là bắt buộc'),
      ValidationRules.email()
    ]
  };

  const { errors, validate, validateAll } = useFormValidation(validationRules);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll(formData as unknown as { [key: string]: string })) {
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Forgot password data:', formData);
      setEmailSent(true);
      
      setTimeout(() => {
        navigate('/verify-otp', { 
          state: { 
            email: formData.email, 
            type: 'reset-password' 
          } 
        });
      }, 3000);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Resend email:', formData.email);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout 
        title="Kiểm tra email của bạn"
        subtitle="Chúng tôi đã gửi mã xác thực đến email của bạn"
      >
        <div className="auth-form">
          <div className="success-message">
            <FiMail size={18} />
            Mã OTP đã được gửi đến {formData.email}
          </div>
          
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
            Vui lòng kiểm tra hộp thư đến và spam. 
            Bạn sẽ được chuyển hướng tự động sau 3 giây.
          </p>
          
          <button
            type="button"
            onClick={handleResendEmail}
            className="btn-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner" />
                Đang gửi lại...
              </>
            ) : (
              <>
                <FiMail size={18} />
                Gửi lại email
              </>
            )}
          </button>
          
          <div className="auth-switch">
            <Link to="/login" className="auth-switch-link">
              <FiArrowLeft size={16} />
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Quên mật khẩu"
      subtitle="Nhập email để nhận mã khôi phục mật khẩu"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Nhập email của bạn"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <button 
          type="submit" 
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner" />
              Đang gửi...
            </>
          ) : (
            <>
              <FiMail size={18} />
              Gửi mã khôi phục
            </>
          )}
        </button>

        <div className="auth-switch">
          Nhớ mật khẩu?
          <Link to="/login" className="auth-switch-link">
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;