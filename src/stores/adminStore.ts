// stores/adminStore.ts
import { create } from 'zustand';
import type { User, Product, Order, Category, Review, ShippingUnit } from '../types';

interface AdminState {
  // State
  currentUser: User | null;
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
  setCurrentUser: (user: User | null) => void;
  setSelectedTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setUsers: (users: User[]) => void;
  setAdmins: (admins: User[]) => void;
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  setCategories: (categories: Category[]) => void;
  setReviews: (reviews: Review[]) => void;
  setShippingUnits: (units: ShippingUnit[]) => void;
  
  addUser: (user: User) => void;
  addAdmin: (admin: User) => void;
  addProduct: (product: Product) => void;
  addCategory: (category: Category) => void;
  
  updateUser: (id: string, user: Partial<User>) => void;
  updateAdmin: (id: string, admin: Partial<User>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  deleteUser: (id: string) => void;
  deleteAdmin: (id: string) => void;
  deleteProduct: (id: string) => void;
  deleteOrder: (id: string) => void;
  deleteCategory: (id: string) => void;
  
  toggleUserStatus: (id: string) => void;
  toggleAdminStatus: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;
  
  updateCategoryProductCount: () => void;
}

// Helper function để toggle status
const toggleStatus = <T extends { status: 'active' | 'inactive' }>(item: T): T => ({
  ...item,
  status: item.status === 'active' ? 'inactive' : 'active'
});

// Helper function để update item trong array
const updateItem = <T extends { id: string }>(
  items: T[],
  id: string,
  updates: Partial<T>
): T[] => items.map(item => item.id === id ? { ...item, ...updates } : item);

// Helper function để delete item
const deleteItem = <T extends { id: string }>(items: T[], id: string): T[] =>
  items.filter(item => item.id !== id);

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

  // Simple setters
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setUsers: (users) => set({ users }),
  setAdmins: (admins) => set({ admins }),
  setOrders: (orders) => set({ orders }),
  setCategories: (categories) => set({ categories }),
  setReviews: (reviews) => set({ reviews }),
  setShippingUnits: (units) => set({ shippingUnits: units }),
  
  // Products với auto-update category count
  setProducts: (products) => {
    set({ products });
    get().updateCategoryProductCount();
  },
  
  // Add actions
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  addAdmin: (admin) => set((state) => ({ admins: [...state.admins, admin] })),
  
  addProduct: (product) => {
    set((state) => ({ products: [...state.products, product] }));
    get().updateCategoryProductCount();
  },
  
  addCategory: (category) => set((state) => ({ 
    categories: [...state.categories, category] 
  })),
  
  // Update actions
  updateUser: (id, updates) => set((state) => ({
    users: updateItem(state.users, id, updates)
  })),
  
  updateAdmin: (id, updates) => set((state) => ({
    admins: updateItem(state.admins, id, updates),
    currentUser: state.currentUser?.id === id 
      ? { ...state.currentUser, ...updates }
      : state.currentUser
  })),
  
  updateProduct: (id, updates) => {
    set((state) => ({ products: updateItem(state.products, id, updates) }));
    get().updateCategoryProductCount();
  },
  
  updateCategory: (id, updates) => set((state) => ({
    categories: updateItem(state.categories, id, updates)
  })),
  
  updateOrderStatus: (id, status) => set((state) => ({
    orders: updateItem(state.orders, id, { status })
  })),
  
  // Delete actions
  deleteUser: (id) => set((state) => ({ users: deleteItem(state.users, id) })),
  deleteAdmin: (id) => set((state) => ({ admins: deleteItem(state.admins, id) })),
  deleteOrder: (id) => set((state) => ({ orders: deleteItem(state.orders, id) })),
  deleteCategory: (id) => set((state) => ({ categories: deleteItem(state.categories, id) })),
  
  deleteProduct: (id) => {
    set((state) => ({ products: deleteItem(state.products, id) }));
    get().updateCategoryProductCount();
  },
  
  // Toggle status actions
  toggleUserStatus: (id) => set((state) => ({
    users: state.users.map(user => user.id === id ? toggleStatus(user) : user)
  })),
  
  toggleAdminStatus: (id) => set((state) => ({
    admins: state.admins.map(admin => admin.id === id ? toggleStatus(admin) : admin)
  })),
  
  toggleCategoryStatus: (id) => set((state) => ({
    categories: state.categories.map(cat => cat.id === id ? toggleStatus(cat) : cat)
  })),
  
  // Update category product count
  updateCategoryProductCount: () => {
    const { products, categories } = get();
    
    const counts = products.reduce((acc, product) => {
      if (product.categoryId) {
        acc[product.categoryId] = (acc[product.categoryId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    set({
      categories: categories.map(category => ({
        ...category,
        productCount: counts[category.id] || 0
      }))
    });
  },
}));