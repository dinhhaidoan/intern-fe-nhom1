import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import OrdersPage from "@/pages/admin/OrdersPage";   // NEW

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin" replace /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders", element: <OrdersPage /> },    // NEW
      { path: "users", element: <UsersPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
