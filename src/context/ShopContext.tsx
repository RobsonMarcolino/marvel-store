import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { CartItem, Review, Order } from '../types';
import { comics } from '../data/comics';

interface User {
    name: string;
    email: string;
    password?: string; // In a real app, never store plain passwords!
    level: number;
    xp: number;
    totalSpent: number;
}

interface ShopContextType {
    cart: CartItem[];
    wishlist: number[];
    reviews: Record<number, Review[]>;
    isCartOpen: boolean;
    isLoginOpen: boolean;
    setIsLoginOpen: (isOpen: boolean) => void;
    isWishlistOpen: boolean;
    setIsWishlistOpen: (isOpen: boolean) => void;
    toggleWishlistModal: () => void;
    isSuccessOpen: boolean;
    setIsSuccessOpen: (isOpen: boolean) => void;
    quickViewId: number | null;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    updateCartQty: (id: number, qty: number) => void;
    toggleWishlist: (id: number) => void;
    addReview: (comicId: number, review: Review) => void;
    toggleCart: () => void;
    openQuickView: (id: number) => void;
    closeQuickView: () => void;
    clearCart: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    // New Features
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    addXp: (amount: number) => void;
    selectedCharacter: string | null;
    setSelectedCharacter: (char: string | null) => void;
    orders: Order[];
    addOrder: (order: Order) => void;
    isOrdersOpen: boolean;
    setIsOrdersOpen: (isOpen: boolean) => void;
    toggleOrdersModal: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('marvelCart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('marvelWishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [reviews, setReviews] = useState<Record<number, Review[]>>(() => {
        const saved = localStorage.getItem('marvelReviews');
        return saved ? JSON.parse(saved) : {};
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [quickViewId, setQuickViewId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // New States
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('marvelUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('marvelCart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('marvelWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('marvelReviews', JSON.stringify(reviews));
    }, [reviews]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('marvelUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('marvelUser');
        }
    }, [user]);

    // Auth Logic
    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users: User[] = JSON.parse(localStorage.getItem('marvelUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            toast.success(`Bem-vindo de volta, Agente ${foundUser.name}!`);
            return true;
        }
        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users: User[] = JSON.parse(localStorage.getItem('marvelUsers') || '[]');

        if (users.some(u => u.email === email)) {
            return false; // Email already exists
        }

        const newUser: User = {
            name,
            email,
            password,
            level: 1,
            xp: 0,
            totalSpent: 0
        };

        users.push(newUser);
        localStorage.setItem('marvelUsers', JSON.stringify(users));
        setUser(newUser);
        toast.success('Novo Agente registrado com sucesso!');
        return true;
    };

    const logout = () => {
        setUser(null);
        toast.success('Logout realizado. Até a próxima missão!');
    };

    const addXp = (amount: number) => {
        if (!user) return;
        const newXp = user.xp + amount;
        const newTotalSpent = user.totalSpent + amount;
        const newLevel = 1 + Math.floor(newXp / 100);

        const updatedUser = {
            ...user,
            xp: newXp,
            totalSpent: newTotalSpent,
            level: newLevel
        };

        setUser(updatedUser);
        if (newLevel > user.level) {
            toast.success(`PARABÉNS! Você subiu para o Nível ${newLevel}!`, { icon: '⭐' });
        }

        // Update in "Database"
        const users: User[] = JSON.parse(localStorage.getItem('marvelUsers') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
        localStorage.setItem('marvelUsers', JSON.stringify(updatedUsers));
    };

    // Shop Logic
    const addToCart = (id: number) => {
        const comic = comics.find(c => c.id === id);
        if (!comic) return;

        toast.success(`${comic.title} adicionado ao carrinho!`);

        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...comic, qty: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateCartQty = (id: number, qty: number) => {
        if (qty < 1) {
            removeFromCart(id);
            return;
        }
        setCart(prev => prev.map(item => item.id === id ? { ...item, qty: qty } : item));
    };

    const toggleWishlist = (id: number) => {
        setWishlist(prev => {
            if (prev.includes(id)) return prev.filter(i => i !== id);
            return [...prev, id];
        });
    };

    const addReview = (comicId: number, review: Review) => {
        setReviews(prev => ({
            ...prev,
            [comicId]: [review, ...(prev[comicId] || [])]
        }));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const toggleWishlistModal = () => setIsWishlistOpen(prev => !prev);
    const openQuickView = (id: number) => setQuickViewId(id);
    const closeQuickView = () => setQuickViewId(null);
    const clearCart = () => setCart([]);

    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem('marvelOrders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('marvelOrders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    const toggleOrdersModal = () => setIsOrdersOpen(prev => !prev);

    return (
        <ShopContext.Provider value={{
            cart, wishlist, reviews, isCartOpen, quickViewId,
            addToCart, removeFromCart, updateCartQty, toggleWishlist, addReview,
            toggleCart, openQuickView, closeQuickView, clearCart,
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            user,
            login,
            register,
            logout,
            addXp,
            selectedCharacter,
            setSelectedCharacter,
            isLoginOpen,
            setIsLoginOpen,
            isWishlistOpen,
            setIsWishlistOpen,
            toggleWishlistModal,
            isSuccessOpen,
            setIsSuccessOpen,
            orders,
            addOrder,
            isOrdersOpen,
            setIsOrdersOpen,
            toggleOrdersModal
        }}>
            {children}
        </ShopContext.Provider>
    );
};
