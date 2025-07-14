
import React, { useContext } from 'react';
import type { Product } from '../types';
import { Role } from '../types';
import { AppContext } from '../context/AppContext';
import { PencilIcon, TrashIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const { user, addToCart, deleteProduct } = useContext(AppContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        {user?.role === Role.ADMIN && (
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(product)} className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
              <PencilIcon className="w-5 h-5 text-gray-700"/>
            </button>
            <button onClick={() => deleteProduct(product.id)} className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
              <TrashIcon className="w-5 h-5 text-red-600"/>
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <button 
            onClick={() => addToCart(product)} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
