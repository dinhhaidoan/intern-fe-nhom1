import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopStore</h3>
            <p className="text-gray-300 mb-4">
              Cửa hàng trực tuyến hàng đầu với các sản phẩm chất lượng cao và dịch vụ tuyệt vời.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white transition-colors">
                  Điện tử
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelery" className="text-gray-300 hover:text-white transition-colors">
                  Trang sức
                </Link>
              </li>
              <li>
                <Link to="/products?category=men's clothing" className="text-gray-300 hover:text-white transition-colors">
                  Thời trang nam
                </Link>
              </li>
              <li>
                <Link to="/products?category=women's clothing" className="text-gray-300 hover:text-white transition-colors">
                  Thời trang nữ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <FiMapPin className="mr-2" size={16} />
                123 Đường ABC, Quận XYZ, TP.HCM
              </li>
              <li className="flex items-center text-gray-300">
                <FiPhone className="mr-2" size={16} />
                (028) 1234 5678
              </li>
              <li className="flex items-center text-gray-300">
                <FiMail className="mr-2" size={16} />
                contact@shopstore.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-300">
            <p>&copy; 2024 ShopStore. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}