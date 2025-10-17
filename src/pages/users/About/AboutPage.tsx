import { FiUsers, FiAward, FiShield, FiHeart } from 'react-icons/fi';
import './About.css';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Về chúng tôi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ShopStore là nền tảng thương mại điện tử hàng đầu, cam kết mang đến trải nghiệm mua sắm trực tuyến tốt nhất với các sản phẩm chất lượng cao và dịch vụ khách hàng xuất sắc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Được thành lập vào năm 2020, ShopStore bắt đầu với một tầm nhìn đơn giản: tạo ra một nền tảng mua sắm trực tuyến mà mọi người đều có thể tin tưởng và yêu thích.
              </p>
              <p>
                Chúng tôi bắt đầu như một cửa hàng nhỏ với chỉ vài sản phẩm, nhưng với sự tận tâm và cam kết chất lượng, chúng tôi đã phát triển thành một trong những nền tảng e-commerce được tin cậy nhất.
              </p>
              <p>
                Ngày nay, chúng tôi phục vụ hàng triệu khách hàng trên toàn thế giới với hàng ngàn sản phẩm từ các thương hiệu uy tín.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sứ mệnh của chúng tôi</h3>
            <p className="text-gray-600 mb-6">
              Sứ mệnh của chúng tôi là làm cho việc mua sắm trực tuyến trở nên dễ dàng, an toàn và thú vị cho mọi người. Chúng tôi cam kết cung cấp:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Sản phẩm chất lượng cao từ các thương hiệu uy tín
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Dịch vụ khách hàng tận tâm và chuyên nghiệp
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Giao hàng nhanh chóng và an toàn
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Giá cả cạnh tranh và minh bạch
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1M+</h3>
            <p className="text-gray-600">Khách hàng hài lòng</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Giải thưởng nhận được</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Độ tin cậy</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Hỗ trợ khách hàng</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Nguyễn Văn A</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Với hơn 15 năm kinh nghiệm trong lĩnh vực e-commerce, A là người dẫn dắt ShopStore hướng tới tương lai.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Trần Thị B</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                B chịu trách nhiệm phát triển và duy trì nền tảng công nghệ hiện đại của ShopStore.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900">Lê Văn C</h3>
              <p className="text-blue-600 mb-2">Head of Marketing</p>
              <p className="text-gray-600 text-sm">
                C đảm bảo rằng thông điệp và giá trị của ShopStore được truyền tải đến đúng khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}