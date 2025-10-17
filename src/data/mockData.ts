// data/mockData.ts
import type { User, Category, Product, Order, Review, ShippingUnit } from '../types';

// Admin hiện tại (full quyền)
export const mockCurrentAdmin: User = {
  id: 'admin-1',
  name: 'Admin Chính',
  email: 'admin@example.com',
  role: 'admin',
  status: 'active',
  createdAt: '2024-01-01',
  lastLogin: '2024-10-15',
  permissions: {
    users: { view: true, create: true, edit: true, delete: true },
    products: { view: true, create: true, edit: true, delete: true },
    categories: { view: true, create: true, edit: true, delete: true },
    orders: { view: true, edit: true, delete: true },
    settings: { view: true, edit: true },
  }
};

// Danh sách admins
export const mockAdmins: User[] = [
  mockCurrentAdmin,
  {
    id: 'admin-2',
    name: 'NV Quản lý Sản phẩm',
    email: 'qlsp@example.com',
    password: 'admin',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-10-14',
    permissions: {
      users: { view: false, create: false, edit: false, delete: false },
      products: { view: true, create: true, edit: true, delete: true },
      categories: { view: true, create: true, edit: true, delete: false },
      orders: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false },
    }
  },
  {
    id: 'admin-3',
    name: 'NV Quản lý Đơn hàng',
    email: 'qldh@example.com',
    password: 'admin',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-10',
    lastLogin: '2024-10-13',
    permissions: {
      users: { view: false, create: false, edit: false, delete: false },
      products: { view: true, create: false, edit: false, delete: false },
      categories: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, edit: true, delete: false },
      settings: { view: false, edit: false },
    }
  },
  {
    id: 'admin-4',
    name: 'NV Hỗ trợ',
    email: 'hotro@example.com',
    password: 'admin',
    role: 'admin',
    status: 'inactive',
    createdAt: '2024-03-01',
    lastLogin: '2024-09-20',
    permissions: {
      users: { view: true, create: false, edit: false, delete: false },
      products: { view: true, create: false, edit: false, delete: false },
      categories: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, edit: true, delete: false },
      settings: { view: false, edit: false },
    }
  },
];

// Users 
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Thành Tâm',
    email: 'nguyenthanhtam10062004@gmail.com',
    password: 'admin',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-10-13',
    totalSpent: 5000000,
  },
  {
    id: '2',
    name: 'Tâm DepZai',
    email: 'tamdepzai@gmail.com',
    password: 'admin',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-20',
    lastLogin: '2024-10-12',
    totalSpent: 3200000,
  },
  {
    id: '3',
    name: 'Lê Văn Luyện',
    email: 'levanluyen@email.com',
    password: 'admin',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-10',
    lastLogin: '2024-09-20',
    totalSpent: 1500000,
  },
  {
    id: '4',
    name: 'Luffy',
    email: 'luffy@email.com',
    password: 'admin',
    role: 'user',
    status: 'active',
    createdAt: '2024-04-05',
    lastLogin: '2024-10-13',
    totalSpent: 8900000,
  },
  {
    id: '5',
    name: 'Cristiano Ronaldo',
    email: 'cr7@email.com',
    password: 'admin',
    role: 'user',
    status: 'active',
    createdAt: '2024-05-01',
    lastLogin: '2024-10-11',
    totalSpent: 2100000,
  },
];

// Danh mục
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Điện thoại',
    slug: 'dien-thoai',
    description: 'Điện thoại thông minh các loại',
    productCount: 0,
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Laptop',
    slug: 'laptop',
    description: 'Máy tính xách tay văn phòng và gaming',
    productCount: 0,
    status: 'active',
    createdAt: '2024-01-12',
  },
  {
    id: '3',
    name: 'Tablet',
    slug: 'tablet',
    description: 'Máy tính bảng iPad và Android',
    productCount: 0,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Phụ kiện',
    slug: 'phu-kien',
    description: 'Phụ kiện công nghệ đa dạng',
    productCount: 0,
    status: 'active',
    createdAt: '2024-02-01',
  },
];

// Sản phẩm
export const mockProducts: Product[] = [
  {
    id: '1',
    code: 'IP15PM256',
    name: 'iPhone 15 Pro',
    price: 30000000,
    category: 'Điện thoại',
    categoryId: '1',
    stock: 15,
    image: 'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/2023/09/pbi-iphone-15-pro-max.png',
    description: 'iPhone 15 Pro Max 256GB',
    sold: 120,
  },
  {
    id: '2',
    code: 'SSS23U512',
    name: 'Samsung Galaxy S24',
    price: 22000000,
    category: 'Điện thoại',
    categoryId: '1',
    stock: 8,
    image: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/01/galaxy-s24-ultra-titanium-violet.png',
    description: 'Samsung Galaxy S24 Ultra',
    sold: 85,
  },
  {
    id: '3',
    code: 'LTDXPS13',
    name: 'Laptop Dell XPS 13',
    price: 25000000,
    category: 'Laptop',
    categoryId: '2',
    stock: 20,
    image: 'https://th.bing.com/th/id/R.bbe58c8447552bc0e3b77fb7981e71fc?rik=IvCoYOSQPKcwUQ&pid=ImgRaw&r=0',
    description: 'Dell XPS 13 i7 16GB RAM',
    sold: 45,
  },
  {
    id: '4',
    code: 'IPADP11M2',
    name: 'iPad Pro 11"',
    price: 20000000,
    category: 'Tablet',
    categoryId: '3',
    stock: 5,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6340/6340504cv11d.jpg',
    description: 'iPad Pro 11 inch M2',
    sold: 60,
  },
  {
    id: '5',
    code: 'MBP14M3',
    name: 'MacBook Pro 14"',
    price: 45000000,
    category: 'Laptop',
    categoryId: '2',
    stock: 10,
    image: 'https://macfinder.co.uk/wp-content/uploads/2022/12/img-MacBook-Pro-Retina-14-Inch-23934.jpg',
    description: 'MacBook Pro 14 M3 Pro',
    sold: 30,
  },
];

// Đơn hàng
export const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '2',
    userName: 'Tâm DepZai',
    products: [
      { id: '1', name: 'iPhone 15 Pro', quantity: 1, price: 30000000 }
    ],
    total: 30000000,
    status: 'delivered',
    createdAt: '2024-10-10',
  },
  {
    id: '1002',
    userId: '4',
    userName: 'Luffy',
    products: [
      { id: '2', name: 'Samsung Galaxy S24', quantity: 1, price: 22000000 },
      { id: '4', name: 'iPad Pro 11"', quantity: 1, price: 20000000 }
    ],
    total: 42000000,
    status: 'shipped',
    createdAt: '2024-10-12',
  },
  {
    id: '1003',
    userId: '2',
    userName: 'Tâm DepZai',
    products: [
      { id: '3', name: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 }
    ],
    total: 25000000,
    status: 'processing',
    createdAt: '2024-10-13',
  },
  {
    id: '1004',
    userId: '1',
    userName: 'Nguyễn Thành Tâm',
    products: [
      { id: '1', name: 'iPhone 15 Pro', quantity: 2, price: 30000000 }
    ],
    total: 60000000,
    status: 'pending',
    createdAt: '2024-10-14',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: '4',
    userName: 'Luffy',
    rating: 5,
    comment: 'Sản phẩm tuyệt vời, giao nhanh!',
    createdAt: '2024-10-11',
    status: 'published'
  },
  {
    id: 'r2',
    productId: '2',
    userId: '2',
    userName: 'Tâm DepZai',
    rating: 4,
    comment: 'Màu sắc đẹp, pin tốt',
    createdAt: '2024-10-12',
    status: 'published'
  },
  {
    id: 'r3',
    productId: '3',
    userId: '3',
    userName: 'Lê Văn Luyện',
    rating: 3,
    comment: 'Tạm ổn, hơi nóng khi chơi game',
    createdAt: '2024-10-09',
    status: 'pending'
  }
];

export const mockShippingUnits: ShippingUnit[] = [
  { id: 's1', name: 'Giao hàng tiêu chuẩn', code: 'STD', price: 30000, estimatedDays: '3-5', active: true },
  { id: 's2', name: 'Giao hàng nhanh', code: 'EXP', price: 60000, estimatedDays: '1-2', active: true },
  { id: 's3', name: 'Giao hàng thu hồi', code: 'RET', price: 0, estimatedDays: 'n/a', active: false },
];