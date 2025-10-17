import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiLock, FiInfo } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import AuthLayout from '../../components/authentication/AuthLayout';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fillSampleAccount = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setFormData({ username: 'admin', password: 'admin123' });
    } else {
      setFormData({ username: 'user', password: 'user123' });
    }
  };

  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn quay trở lại">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <FiInfo className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-2">Tài khoản mẫu:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-800">
                  <strong>Admin:</strong> admin / admin123
                </span>
                <button
                  type="button"
                  onClick={() => fillSampleAccount('admin')}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Sử dụng
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800">
                  <strong>User:</strong> user / user123
                </span>
                <button
                  type="button"
                  onClick={() => fillSampleAccount('user')}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Sử dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Tên đăng nhập
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <Link
            to="/auth/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}