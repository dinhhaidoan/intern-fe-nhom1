export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPING" | "COMPLETED" | "CANCELLED";

export type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  price: number; // per unit
};

export type Order = {
  id: string;
  code: string;          // Mã đơn
  customerName: string;
  createdAt: string;     // ISO
  status: OrderStatus;
  items: OrderItem[];
};

export type UserRole = "ADMIN" | "USER";
export type UserAccount = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string;
};

export type SiteSettings = {
  shopName: string;
  logoUrl: string;
  currency: "VND" | "USD";
  darkMode: boolean;
};
