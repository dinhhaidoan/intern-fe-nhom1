import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiArrowLeft, FiCheck } from 'react-icons/fi';
import AuthLayout from '../../components/authentication/AuthLayout';
import FormInput from '../../components/authentication/FormInput';
import { useFormValidation, ValidationRules } from '../../hooks/useFormValidation';
import type { ResetPasswordFormData } from '../../types/auth';

interface LocationState {
  email: string;
  token: string;
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!state?.email || !state?.token) {
      navigate('/forgot-password');
    }
  }, [state, navigate]);

  const validationRules = {
    password: [
      ValidationRules.required('Mật khẩu là bắt buộc'),
      ValidationRules.password()
    ],
    confirmPassword: [
      ValidationRules.required('Xác nhận mật khẩu là bắt buộc'),
      ValidationRules.confirmPassword(formData.password)
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
    
    validationRules.confirmPassword = [
      ValidationRules.required('Xác nhận mật khẩu là bắt buộc'),
      ValidationRules.confirmPassword(formData.password)
    ];
    
    if (!validateAll(formData as unknown as { [key: string]: string })) {
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Reset password data:', {
        email: state.email,
        token: state.token,
        password: formData.password
      });
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/login', {
          state: { 
            message: 'Mật khẩu đã được đặt lại thành công! Vui lòng đăng nhập với mật khẩu mới.' 
          }
        });
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!state?.email || !state?.token) {
    return null;
  }

  if (success) {
    return (
      <AuthLayout 
        title="Đặt lại mật khẩu thành công"
        subtitle="Mật khẩu của bạn đã được cập nhật"
      >
        <div className="auth-form">
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              backgroundColor: '#f0fdf4',
              borderRadius: '50%',
              marginBottom: '1rem'
            }}>
              <FiCheck size={32} color="#10b981" />
            </div>
            
            <div className="success-message">
              <FiCheck size={18} />
              Mật khẩu đã được đặt lại thành công!
            </div>
          </div>
          
          <p style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            Bạn có thể đăng nhập với mật khẩu mới. 
            Bạn sẽ được chuyển hướng tự động sau 3 giây.
          </p>
          
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
            <FiLock size={18} />
            Đăng nhập ngay
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Đặt lại mật khẩu"
      subtitle={`Tạo mật khẩu mới cho tài khoản ${state.email}`}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div style={{ 
          padding: '0.75rem',
          backgroundColor: '#f0f4ff',
          border: '1px solid #667eea',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#4338ca'
        }}>
          💡 Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
        </div>

        <FormInput
          label="Mật khẩu mới"
          name="password"
          type="password"
          placeholder="Tạo mật khẩu mới"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <FormInput
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
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
              Đang cập nhật...
            </>
          ) : (
            <>
              <FiLock size={18} />
              Đặt lại mật khẩu
            </>
          )}
        </button>

        <div className="auth-switch">
          Nhớ mật khẩu?
          <Link to="/login" className="auth-switch-link">
            <FiArrowLeft size={16} />
            Quay lại đăng nhập
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;