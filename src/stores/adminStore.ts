// stores/adminStore.ts
import { create } from 'zustand';
import type { User, Product, Order, Category, Review, ShippingUnit } from '../types';

interface AdminState {
  // Admin hiện tại
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // State
  selectedTab: string;
  searchQuery: string;
  users: User[];
  admins: User[];
  products: Product[];
  orders: Order[];
  categories: Category[];
  reviews: Review[];
  shippingUnits: ShippingUnit[];
  
  // Actions
  setSelectedTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  
  // Users (không có admin)
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  
  // Admins
  setAdmins: (admins: User[]) => void;
  addAdmin: (admin: User) => void;
  updateAdmin: (id: string, admin: Partial<User>) => void;
  deleteAdmin: (id: string) => void;
  toggleAdminStatus: (id: string) => void;
  
  // Products
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Orders
  setOrders: (orders: Order[]) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  
  // Categories
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;
  updateCategoryProductCount: () => void;
  setReviews: (reviews: Review[]) => void;
  setShippingUnits: (units: ShippingUnit[]) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // Initial state
  currentUser: null,
  selectedTab: 'dashboard',
  searchQuery: '',
  users: [],
  admins: [],
  products: [],
  orders: [],
  categories: [],
  reviews: [],
  shippingUnits: [],

  // Current user
  setCurrentUser: (user) => set({ currentUser: user }),

  // Actions
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Users
  setUsers: (users) => set({ users }),
  
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  
  updateUser: (id, updatedUser) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    )
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  
  toggleUserStatus: (id) => set((state) => ({
    users: state.users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    )
  })),
  
  // Admins
  setAdmins: (admins) => set({ admins }),
  
  addAdmin: (admin) => set((state) => ({ 
    admins: [...state.admins, admin] 
  })),
  
  updateAdmin: (id, updatedAdmin) => set((state) => ({
    admins: state.admins.map(admin => 
      admin.id === id ? { ...admin, ...updatedAdmin } : admin
    ),
    // Nếu update admin hiện tại
    currentUser: state.currentUser?.id === id 
      ? { ...state.currentUser, ...updatedAdmin }
      : state.currentUser
  })),
  
  deleteAdmin: (id) => set((state) => ({
    admins: state.admins.filter(admin => admin.id !== id)
  })),
  
  toggleAdminStatus: (id) => set((state) => ({
    admins: state.admins.map(admin => 
      admin.id === id 
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' } 
        : admin
    )
  })),
  
  // Products
  setProducts: (products) => {
    set({ products });
    get().updateCategoryProductCount();
  },
  
  addProduct: (product) => {
    set((state) => ({ products: [...state.products, product] }));
    get().updateCategoryProductCount();
  },
  
  updateProduct: (id, updatedProduct) => {
    set((state) => ({
      products: state.products.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    }));
    get().updateCategoryProductCount();
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
    get().updateCategoryProductCount();
  },
  
  // Orders
  setOrders: (orders) => set({ orders }),
  
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status } : order
    )
  })),
  
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter(order => order.id !== id)
  })),
  
  // Categories
  setCategories: (categories) => set({ categories }),

  setReviews: (reviews) => set({ reviews }),
  setShippingUnits: (units) => set({ shippingUnits: units }),
  
  addCategory: (category) => set((state) => ({ 
    categories: [...state.categories, category] 
  })),
  
  updateCategory: (id, updatedCategory) => set((state) => ({
    categories: state.categories.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    )
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(category => category.id !== id)
  })),
  
  toggleCategoryStatus: (id) => set((state) => ({
    categories: state.categories.map(category => 
      category.id === id 
        ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' } 
        : category
    )
  })),
  
  // Cập nhật số lượng sản phẩm cho mỗi danh mục
  updateCategoryProductCount: () => {
    const { products, categories } = get();
    
    const counts: Record<string, number> = {};
    products.forEach(product => {
      if (product.categoryId) {
        counts[product.categoryId] = (counts[product.categoryId] || 0) + 1;
      }
    });
    
    set({
      categories: categories.map(category => ({
        ...category,
        productCount: counts[category.id] || 0
      }))
    });
  },
}));