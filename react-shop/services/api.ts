
import type { User, Product } from '../types';
import { Role } from '../types';
import { MOCK_USERS, INITIAL_PRODUCTS } from '../constants';

// --- DATABASE SIMULATION ---
let products: Product[] = [...INITIAL_PRODUCTS];
let nextProductId = products.length + 1;

// --- AUTH SIMULATION ---
const FAKE_JWT_KEY = 'fake_jwt';

export const api = {
  auth: {
    login: async (username: string): Promise<User | null> => {
      const user = MOCK_USERS.find(u => u.username === username);
      if (user) {
        // Simulate JWT: Base64 encode the user object
        const fakeJwt = btoa(JSON.stringify(user));
        localStorage.setItem(FAKE_JWT_KEY, fakeJwt);
        return Promise.resolve(user);
      }
      return Promise.resolve(null);
    },

    logout: (): void => {
      localStorage.removeItem(FAKE_JWT_KEY);
    },

    getCurrentUser: (): User | null => {
      const token = localStorage.getItem(FAKE_JWT_KEY);
      if (token) {
        try {
          return JSON.parse(atob(token));
        } catch (e) {
          return null;
        }
      }
      return null;
    },
  },
  
  products: {
    get: async (page = 1, limit = 8, query = ''): Promise<{ data: Product[], total: number }> => {
      let filteredProducts = products;
      if (query) {
        filteredProducts = products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      const total = filteredProducts.length;
      const paginatedData = filteredProducts.slice((page - 1) * limit, page * limit);

      return Promise.resolve({ data: paginatedData, total });
    },

    add: async (productData: Omit<Product, 'id'>, user: User | null): Promise<Product> => {
      if (user?.role !== Role.ADMIN) {
        throw new Error('Unauthorized');
      }
      const newProduct: Product = { ...productData, id: nextProductId++ };
      products = [newProduct, ...products];
      return Promise.resolve(newProduct);
    },

    update: async (id: number, productData: Partial<Product>, user: User | null): Promise<Product> => {
      if (user?.role !== Role.ADMIN) {
        throw new Error('Unauthorized');
      }
      const index = products.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      products[index] = { ...products[index], ...productData };
      return Promise.resolve(products[index]);
    },

    delete: async (id: number, user: User | null): Promise<void> => {
      if (user?.role !== Role.ADMIN) {
        throw new Error('Unauthorized');
      }
      products = products.filter(p => p.id !== id);
      return Promise.resolve();
    }
  },
};
