import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { useSound, SOUNDS } from '../hooks/useSound';

export const Navbar = () => {
    const { cart, toggleCart, searchQuery, setSearchQuery, user, logout, setIsLoginOpen, toggleWishlistModal, wishlist, toggleOrdersModal, orders } = useShop();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [playClick] = useSound(SOUNDS.CLICK);
    const [playTheme] = useSound(SOUNDS.THEME_SWITCH);

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    const toggleMobileMenu = () => {
        playClick();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleThemeToggle = () => {
        playTheme();
        toggleTheme();
    };

    return (
        <div className="sticky top-0 z-50 flex flex-col items-center pointer-events-none">
            <nav className="w-full bg-gray-900 text-white shadow-2xl border-b-2 border-red-600/50 pointer-events-auto relative overflow-hidden transition-all duration-300" id="navbar">
                <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/97/74/57/977457b721a68d280eadfcb1b8d2765a.jpg')] bg-cover bg-center opacity-75"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/90"></div>

                <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10 h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
                        <div className="bg-red-600 text-white px-3 py-1 font-black text-2xl tracking-tighter uppercase select-none transform -skew-x-12 group-hover:skew-x-0 transition-transform shadow-lg">
                            Marvel
                        </div>
                        <span className="font-bold text-xl tracking-wide hidden sm:block ml-1 group-hover:text-red-500 transition-colors drop-shadow-md">
                            Comics Store
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Theme Toggle */}
                        <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-white/10 transition relative group" title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-red-500 transition-colors shadow-lg relative group-hover:scale-110 transform duration-300">
                                <img
                                    src="https://i.pinimg.com/736x/02/96/b3/0296b374ab06c24e7af715341e332219.jpg"
                                    alt="Theme Toggle"
                                    className={`w-full h-full object-cover transition-all duration-500 ${theme === 'dark' ? 'grayscale opacity-80' : 'grayscale-0'}`}
                                />
                                <div className={`absolute inset-0 bg-red-500/20 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}></div>
                            </div>
                        </button>

                        {/* User / Login */}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden lg:block">
                                    <div className="text-xs text-gray-400 uppercase font-bold">Nível {user.level}</div>
                                    <div className="text-sm font-bold text-white">{user.name}</div>
                                </div>
                                <div className="relative group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-white/20">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 border border-gray-700">
                                        <div className="px-4 py-2 border-b border-gray-800">
                                            <div className="text-xs text-gray-500">XP: {user.xp} / {user.level * 100}</div>
                                            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-1">
                                                <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${(user.xp % 100)}%` }}></div>
                                            </div>
                                        </div>
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-red-500">
                                            Sair da Missão
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setIsLoginOpen(true)} className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                                Login
                            </button>
                        )}

                        <div className="h-6 w-px bg-gray-700"></div>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Buscar HQ..."
                                className="bg-gray-800/80 text-white text-sm rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 w-48 transition-all focus:w-64 placeholder-gray-400 font-sans shadow-inner backdrop-blur-sm border border-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-400 group-focus-within:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {user && (
                            <div className="relative cursor-pointer group" onClick={toggleOrdersModal}>
                                <div className="p-2 rounded-full hover:bg-white/10 transition relative backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    {orders.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-200 border-2 border-gray-900 shadow-sm">
                                            {orders.filter(o => o.status !== 'delivered').length}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="relative cursor-pointer group" onClick={toggleWishlistModal}>
                            <div className="p-2 rounded-full hover:bg-white/10 transition relative backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-200 border-2 border-gray-900 shadow-sm">
                                        {wishlist.length}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative cursor-pointer group" onClick={toggleCart}>
                            <div className="p-2 rounded-full hover:bg-white/10 transition backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className={`absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-200 border-2 border-gray-900 shadow-sm ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>
                                    {cartCount}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <div className="relative cursor-pointer" onClick={toggleCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-gray-900">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div id="mobile-menu" className={`relative z-10 bg-gray-900 border-t border-gray-800 md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="p-4 space-y-4">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-gray-800 text-white p-2 rounded-lg text-sm border border-gray-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <a href="#" className="block text-gray-300 hover:text-red-500 py-2 font-bold">Meus Favoritos</a>
                        {user && (
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleOrdersModal(); setIsMobileMenuOpen(false); }} className="block text-gray-300 hover:text-red-500 py-2 font-bold">Meus Pedidos</a>
                        )}
                        <a href="#products-grid" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-red-500 py-2 font-bold">Lançamentos</a>
                        <a href="#about-section" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-300 hover:text-red-500 py-2 font-bold">Sobre Nós</a>
                        {user ? (
                            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-red-500 hover:text-red-400 py-2 font-bold border-t border-gray-800 mt-2 pt-4">
                                Sair da Missão
                            </button>
                        ) : (
                            <button onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-left text-white hover:text-red-500 py-2 font-bold border-t border-gray-800 mt-2 pt-4">
                                Login / Cadastro
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};
