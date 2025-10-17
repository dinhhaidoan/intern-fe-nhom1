import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types/product';

interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      
      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }]
          });
        }
        get().calculateTotal();
      },
      
      removeItem: (productId: number) => {
        set({
          items: get().items.filter(item => item.product.id !== productId)
        });
        get().calculateTotal();
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
        get().calculateTotal();
      },
      
      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },
      
      calculateTotal: () => {
        const { items } = get();
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);