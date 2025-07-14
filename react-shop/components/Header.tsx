
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Role } from '../types';
import { ShoppingCartIcon, UserCircleIcon } from './icons';

interface HeaderProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  onViewChange: (view: 'shop' | 'admin') => void;
  activeView: 'shop' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onLoginClick, onViewChange, activeView }) => {
  const { user, logout, cart } = useContext(AppContext);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">React Shop</h1>
            <nav className="hidden md:flex space-x-4">
              <button 
                onClick={() => onViewChange('shop')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'shop' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Shop
              </button>
              {user?.role === Role.ADMIN && (
                <button 
                  onClick={() => onViewChange('admin')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Admin
                </button>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onCartClick} className="relative text-gray-500 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-7 w-7 text-gray-400"/>
              {user ? (
                <div className="text-sm">
                  <span className="text-gray-600">Hi, {user.username}</span>
                  <button onClick={logout} className="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={onLoginClick} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
