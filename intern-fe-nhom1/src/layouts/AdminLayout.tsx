import { Outlet } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '@/styles/admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-wrap">
      <AdminSidebar />
      <div>
        <AdminHeader />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
