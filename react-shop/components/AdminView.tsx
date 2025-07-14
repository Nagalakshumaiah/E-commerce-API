
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import { PlusIcon } from './icons';

interface AdminViewProps {
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onAddProduct, onEditProduct }) => {
  const { products, isLoading, error } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Manage Products</h2>
        <button
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!isLoading && !error && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onEdit={onEditProduct} />
            ))}
        </div>
      )}
    </div>
  );
};
