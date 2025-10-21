import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const initialPhone = user && 'phone' in user ? (user as unknown as { phone?: string }).phone ?? '' : '';
  const [phone, setPhone] = useState<string>(initialPhone);

  const handleSave = () => {
    alert('Đã lưu thông tin người dùng (mock)');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-200 p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-200 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-200 p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="pt-4 flex items-center gap-3">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Lưu</button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-md">Hủy</button>
        </div>
      </div>
    </div>
  );
}
