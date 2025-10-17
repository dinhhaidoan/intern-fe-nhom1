import { Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-6">
          <FiAlertTriangle className="text-red-600" size={48} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Không có quyền truy cập
        </h1>
        
        <p className="text-gray-600 mb-8">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>
        
        <div className="space-y-3">
          <Link
            to="/"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2" size={20} />
            Về trang chủ
          </Link>
          
          <Link
            to="/auth/login"
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors block"
          >
            Đăng nhập lại
          </Link>
        </div>
      </div>
    </div>
  );
}