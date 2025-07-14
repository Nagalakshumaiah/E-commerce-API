
import React, { useState, useContext, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Modal } from './components/Modal';
import { LoginView } from './components/LoginView';
import { CartView } from './components/CartView';
import { AdminView } from './components/AdminView';
import { ProductForm } from './components/ProductForm';
import type { Product } from './types';
import { Role } from './types';

type ModalType = 'login' | 'cart' | 'productForm' | null;
type ViewType = 'shop' | 'admin';

const AppContent: React.FC = () => {
    const { products, isLoading, error, fetchProducts, totalProducts, user } = useContext(AppContext);

    const [modal, setModal] = useState<ModalType>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [view, setView] = useState<ViewType>('shop');
    
    // Pagination and Search State
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 8;
    
    useEffect(() => {
        if(view === 'shop') {
            fetchProducts(currentPage, productsPerPage, searchQuery);
        } else {
            // For admin view, we get all products
            fetchProducts(1, 1000, ''); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchQuery, view, fetchProducts]);

    useEffect(() => {
        // If user logs out, switch to shop view
        if (!user || user.role !== Role.ADMIN) {
            setView('shop');
        }
    }, [user]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };
    
    const openProductForm = (product: Product | null) => {
        setEditingProduct(product);
        setModal('productForm');
    };

    const closeModal = () => {
        setModal(null);
        setEditingProduct(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header 
                onCartClick={() => setModal('cart')} 
                onLoginClick={() => setModal('login')}
                onViewChange={setView}
                activeView={view}
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {view === 'shop' && (
                    <>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search products by name or category..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full max-w-lg mx-auto block p-3 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {isLoading && <p className="text-center">Loading products...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {!isLoading && !error && products.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} onEdit={() => openProductForm(product)} />
                                ))}
                            </div>
                        )}
                         {!isLoading && !error && products.length === 0 && (
                             <p className="text-center text-gray-500 mt-8">No products found for your search.</p>
                         )}

                        {totalPages > 1 && (
                            <nav className="flex justify-center mt-8">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button 
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`mx-1 px-4 py-2 rounded-md text-sm font-medium ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </nav>
                        )}
                    </>
                )}

                {view === 'admin' && user?.role === Role.ADMIN && (
                    <AdminView 
                        onAddProduct={() => openProductForm(null)}
                        onEditProduct={openProductForm}
                    />
                )}
            </main>

            <Modal isOpen={modal === 'login'} onClose={closeModal} title="Login">
                <LoginView onLoginSuccess={closeModal} />
            </Modal>
            <Modal isOpen={modal === 'cart'} onClose={closeModal} title="Your Shopping Cart">
                <CartView />
            </Modal>
            <Modal isOpen={modal === 'productForm'} onClose={closeModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
                <ProductForm product={editingProduct} onSuccess={closeModal} />
            </Modal>
        </div>
    );
};

const App: React.FC = () => (
    <AppProvider>
        <AppContent />
    </AppProvider>
);

export default App;
