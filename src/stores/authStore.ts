import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string, name: string) => Promise<boolean>;
}

const sampleUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@shopstore.com',
    role: 'admin' as const,
    name: 'Admin User'
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    email: 'user@shopstore.com',
    role: 'user' as const,
    name: 'Normal User'
  }
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundUser = sampleUsers.find(
          u => u.username === username && u.password === password
        );

        if (foundUser) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = foundUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },

      register: async (username: string, email: string, _password: string, name: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const existingUser = sampleUsers.find(u => u.username === username || u.email === email);
        if (existingUser) {
          return false;
        }

        const newUser = {
          id: String(Date.now()),
          username,
          email,
          role: 'user' as const,
          name
        };

        set({
          user: newUser,
          isAuthenticated: true
        });
        return true;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);