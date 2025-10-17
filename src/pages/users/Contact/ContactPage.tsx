import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import './Contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các phương thức dưới đây.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Chủ đề tin nhắn"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tin nhắn của bạn..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FiMapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Địa chỉ</h4>
                    <p className="text-gray-600">123 Đường ABC, Quận XYZ<br />TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiPhone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Điện thoại</h4>
                    <p className="text-gray-600">(028) 1234 5678</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FiMail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@shopstore.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <FiClock className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Giờ làm việc</h4>
                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00<br />Thứ 7: 8:00 - 12:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Cần hỗ trợ nhanh?</h3>
              <p className="mb-4">Liên hệ hotline để được hỗ trợ 24/7</p>
              <div className="text-center">
                <p className="text-2xl font-bold">1900 1234</p>
                <p className="text-blue-200">Miễn phí từ điện thoại bàn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Làm thế nào để đặt hàng?</h3>
              <p className="text-gray-600 mb-4">
                Bạn có thể dễ dàng đặt hàng qua website bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Thời gian giao hàng là bao lâu?</h3>
              <p className="text-gray-600">
                Thời gian giao hàng thông thường là 2-3 ngày làm việc trong nội thành và 3-5 ngày cho các tỉnh khác.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Chính sách đổi trả như thế nào?</h3>
              <p className="text-gray-600 mb-4">
                Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Có hỗ trợ thanh toán trả góp không?</h3>
              <p className="text-gray-600">
                Có, chúng tôi hỗ trợ thanh toán trả góp qua thẻ tín dụng và các đối tác tài chính.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}