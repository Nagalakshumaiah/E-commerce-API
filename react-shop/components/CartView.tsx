
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { TrashIcon } from './icons';

export const CartView: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useContext(AppContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Order placed successfully! Total: ₹${subtotal.toLocaleString('en-IN')}`);
    clearCart();
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-gray-200">
        {cart.map(item => (
          <li key={item.id} className="flex py-4 items-center">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div className="ml-4 flex-1">
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex items-center">
              <input 
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value, 10))}
                className="w-16 p-1 border rounded text-center"
              />
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-500 hover:text-red-600">
                <TrashIcon className="w-5 h-5"/>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-sm text-gray-500">Shipping and taxes are calculated at checkout.</p>
        <button 
          onClick={handleCheckout} 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
