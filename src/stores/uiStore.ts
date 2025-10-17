import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  searchQuery: string;
  loading: boolean;
  setSidebarOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarOpen: false,
  cartOpen: false,
  mobileMenuOpen: false,
  searchQuery: '',
  loading: false,
  
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setCartOpen: (open: boolean) => set({ cartOpen: open }),
  setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setLoading: (loading: boolean) => set({ loading }),
  
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  toggleCart: () => set({ cartOpen: !get().cartOpen }),
  toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
}));