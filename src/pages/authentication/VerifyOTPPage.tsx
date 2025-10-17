import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiShield, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import AuthLayout from '../../components/authentication/AuthLayout';
import OTPInput from '../../components/authentication/OTPInput';

interface LocationState {
  email: string;
  type: 'register' | 'reset-password';
}

const VerifyOTPPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!state?.email) {
      navigate('/login');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOTPComplete = async (otpValue: string) => {
    setOtp(otpValue);
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otpValue === '123456') {
        console.log('OTP verified:', otpValue);
        
        if (state.type === 'register') {
          navigate('/login', {
            state: { 
              message: 'Đăng ký thành công! Vui lòng đăng nhập.' 
            }
          });
        } else {
          navigate('/reset-password', {
            state: { 
              email: state.email,
              token: 'mock-reset-token' 
            }
          });
        }
      } else {
        setError('Mã OTP không chính xác. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
    if (error) setError('');
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resend OTP to:', state.email);
      
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Không thể gửi lại mã OTP. Vui lòng thử lại.');
    } finally {
      setResendLoading(false);
    }
  };

  const getTitle = () => {
    return state?.type === 'register' 
      ? 'Xác thực tài khoản' 
      : 'Xác thực đặt lại mật khẩu';
  };

  const getSubtitle = () => {
    return `Nhập mã OTP 6 chữ số được gửi đến ${state?.email}`;
  };

  if (!state?.email) {
    return null;
  }

  return (
    <AuthLayout 
      title={getTitle()}
      subtitle={getSubtitle()}
    >
      <div className="auth-form">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#f0f4ff',
            borderRadius: '50%',
            marginBottom: '1rem'
          }}>
            <FiShield size={32} color="#667eea" />
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Mã OTP sẽ hết hạn sau 5 phút. 
            {state.type === 'register' && ' Sau khi xác thực, tài khoản của bạn sẽ được kích hoạt.'}
          </p>
        </div>

        <OTPInput
          length={6}
          onComplete={handleOTPComplete}
          onChange={handleOTPChange}
          error={error}
        />

        {isLoading && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            color: '#667eea'
          }}>
            <div className="loading-spinner" />
            Đang xác thực...
          </div>
        )}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Không nhận được mã OTP?
          </p>
          
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend || resendLoading}
            className={canResend ? "btn-secondary" : "btn-secondary"}
            style={{ 
              opacity: canResend ? 1 : 0.6,
              cursor: canResend ? 'pointer' : 'not-allowed'
            }}
          >
            {resendLoading ? (
              <>
                <div className="loading-spinner" />
                Đang gửi...
              </>
            ) : (
              <>
                <FiRefreshCw size={16} />
                {canResend ? 'Gửi lại mã OTP' : `Gửi lại sau ${countdown}s`}
              </>
            )}
          </button>
        </div>

        <div className="auth-switch">
          <Link to="/login" className="auth-switch-link">
            <FiArrowLeft size={16} />
            Quay lại đăng nhập
          </Link>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: '#0369a1'
        }}>
          💡 Demo: Sử dụng mã OTP <strong>123456</strong> để test
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTPPage;