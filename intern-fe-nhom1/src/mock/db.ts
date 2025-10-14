import type { Order, OrderStatus, UserAccount, SiteSettings } from "@/types/ecom";

const ORDERS_KEY = "mock_orders";
const USERS_KEY  = "mock_users";
const SETTINGS_KEY = "mock_settings";

const sampleOrders: Order[] = [
  {
    id: "o_001",
    code: "DH-20251013-001",
    customerName: "Nguyễn Văn A",
    createdAt: new Date().toISOString(),
    status: "PENDING",
    items: [
      { productId: "p1", name: "Giày Runner Pro", qty: 1, price: 1250000 },
      { productId: "p2", name: "Tai nghe BassX", qty: 2, price: 490000 },
    ],
  },
  {
    id: "o_002",
    code: "DH-20251013-002",
    customerName: "Trần Thị B",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "COMPLETED",
    items: [{ productId: "p3", name: "Bàn phím Cơ 87", qty: 1, price: 1590000 }],
  },
];

const sampleUsers: UserAccount[] = [
  { id: "u_001", name: "Admin Root", email: "root@example.com", role: "ADMIN", isBlocked: false, createdAt: new Date().toISOString() },
  { id: "u_002", name: "Hà Minh Quang", email: "quang@example.com", role: "USER", isBlocked: false, createdAt: new Date().toISOString() },
  { id: "u_003", name: "Lê Tấn Vỹ", email: "vy@example.com", role: "USER", isBlocked: false, createdAt: new Date().toISOString() },
];

const defaultSettings: SiteSettings = {
  shopName: "Intern FE Store",
  logoUrl: "",
  currency: "VND",
  darkMode: false,
};

function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || "") as T; }
  catch { return fallback; }
}

function write<T>(key: string, data: T) { localStorage.setItem(key, JSON.stringify(data)); }

export const db = {
  orders: {
    all(): Order[] {
      const data = read<Order[]>(ORDERS_KEY, sampleOrders);
      if (!localStorage.getItem(ORDERS_KEY)) write(ORDERS_KEY, data);
      return data;
    },
    set(data: Order[]) { write(ORDERS_KEY, data); },
    updateStatus(id: string, status: OrderStatus) {
      const data = db.orders.all().map(o => o.id === id ? { ...o, status } : o);
      db.orders.set(data);
      return data.find(o => o.id === id)!;
    },
  },
  users: {
    all(): UserAccount[] {
      const data = read<UserAccount[]>(USERS_KEY, sampleUsers);
      if (!localStorage.getItem(USERS_KEY)) write(USERS_KEY, data);
      return data;
    },
    set(data: UserAccount[]) { write(USERS_KEY, data); },
    toggleBlock(id: string) {
      const data = db.users.all().map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u);
      db.users.set(data);
    },
    setRole(id: string, role: UserAccount["role"]) {
      const data = db.users.all().map(u => u.id === id ? { ...u, role } : u);
      db.users.set(data);
    },
  },
  settings: {
    get(): SiteSettings {
      const data = read<SiteSettings>(SETTINGS_KEY, defaultSettings);
      if (!localStorage.getItem(SETTINGS_KEY)) write(SETTINGS_KEY, data);
      return data;
    },
    set(s: SiteSettings) { write(SETTINGS_KEY, s); }
  }
};
