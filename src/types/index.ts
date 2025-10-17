// types/index.ts 
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  totalSpent?: number;
  avatar?: string;
  permissions?: AdminPermissions;
}

export interface AdminPermissions {
  users: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  products: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  categories: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  orders: {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
  reviews?: {
    view?: boolean;
    moderate?: boolean;
  };
  shipping?: {
    view?: boolean;
    manage?: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  parentId?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  categoryId?: string;
  stock: number;
  image: string;
  description: string;
  sold?: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

// Thêm types cho biểu đồ dashboard
export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface ProductSalesData {
  code: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface UserGrowthData {
  date: string;
  users: number;
  newUsers: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  status: 'published' | 'pending' | 'hidden';
}

export interface ShippingUnit {
  id: string;
  name: string;
  code: string;
  price: number;
  estimatedDays?: string;
  active: boolean;
}