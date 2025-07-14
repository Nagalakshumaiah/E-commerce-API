
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid username. Try "admin" or "customer".');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <p className="text-sm text-gray-600">
        Enter a username to log in. <br/>
        Use <code className="bg-gray-200 px-1 rounded">admin</code> for admin privileges or <code className="bg-gray-200 px-1 rounded">customer</code> for a regular user.
      </p>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          placeholder="e.g., admin"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button 
        type="submit" 
        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Login
      </button>
    </form>
  );
};
