
import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User, Product, CartItem } from '../types';
import { api } from '../services/api';

interface AppContextType {
  user: User | null;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (page?: number, limit?: number, query?: string) => void;
  totalProducts: number;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const AppContext = createContext<AppContextType>(null!);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // --- Auth Effects ---
  useEffect(() => {
    const currentUser = api.auth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // --- Product Methods ---
  const fetchProducts = useCallback(async (page = 1, limit = 100, query = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, total } = await api.products.get(page, limit, query);
      setProducts(data);
      setTotalProducts(total);
    } catch (e) {
      setError('Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1, 100); // Fetch all for admin view initially
  }, [fetchProducts]);

  // --- Auth Methods ---
  const login = async (username: string) => {
    const loggedInUser = await api.auth.login(username);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };
  
  // --- Admin Product Methods ---
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    await api.products.add(productData, user);
    await fetchProducts(1, 100); // Refetch all
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    await api.products.update(id, productData, user);
    await fetchProducts(1, 100); // Refetch all
  };

  const deleteProduct = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this product?')){
        await api.products.delete(id, user);
        await fetchProducts(1, 100); // Refetch all
    }
  };

  // --- Cart Methods ---
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    user,
    login,
    logout,
    products,
    isLoading,
    error,
    fetchProducts,
    totalProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
