import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import AuthLayout from '../../components/authentication/AuthLayout';
import FormInput from '../../components/authentication/FormInput';
import { useFormValidation, ValidationRules } from '../../hooks/useFormValidation';
import type { RegisterFormData } from '../../types/auth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    firstName: [
      ValidationRules.required('Họ là bắt buộc'),
      ValidationRules.name('Họ chỉ được chứa chữ cái'),
      ValidationRules.minLength(2, 'Họ phải có ít nhất 2 ký tự')
    ],
    lastName: [
      ValidationRules.required('Tên là bắt buộc'),
      ValidationRules.name('Tên chỉ được chứa chữ cái'),
      ValidationRules.minLength(2, 'Tên phải có ít nhất 2 ký tự')
    ],
    email: [
      ValidationRules.required('Email là bắt buộc'),
      ValidationRules.email()
    ],
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
      
      console.log('Register data:', formData);
      
      navigate('/verify-otp', { 
        state: { 
          email: formData.email, 
          type: 'register' 
        } 
      });
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log('Google register clicked');
  };

  return (
    <AuthLayout 
      title="Tạo tài khoản mới"
      subtitle="Tham gia cùng chúng tôi ngay hôm nay"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <FormInput
            label="Họ"
            name="firstName"
            type="text"
            placeholder="Nhập họ của bạn"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />
          
          <FormInput
            label="Tên"
            name="lastName"
            type="text"
            placeholder="Nhập tên của bạn"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
        </div>

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

        <FormInput
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="Tạo mật khẩu"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <FormInput
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu"
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
              Đang tạo tài khoản...
            </>
          ) : (
            <>
              <FiUserPlus size={18} />
              Tạo tài khoản
            </>
          )}
        </button>

        <div className="divider">
          <span className="divider-text">Hoặc</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="btn-google"
        >
          <FaGoogle size={18} />
          Đăng ký với Google
        </button>

        <div className="auth-switch">
          Đã có tài khoản?
          <Link to="/login" className="auth-switch-link">
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;