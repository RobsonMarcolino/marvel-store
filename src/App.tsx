import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ShopProvider, useShop } from './context/ShopContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlashSale } from './components/FlashSale';
import { UniverseSection } from './components/UniverseSection';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { LoginModal } from './components/LoginModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { WishlistModal } from './components/WishlistModal';
import { OrdersModal } from './components/OrdersModal';
import { Reveal } from './components/Reveal';

function AppContent() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { isCartOpen, quickViewId, isLoginOpen, setIsLoginOpen, isSuccessOpen, setIsSuccessOpen } = useShop();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-page-wrapper text-gray-800 overflow-x-hidden min-h-screen py-0 md:py-8 font-sans">
            <div className="fixed inset-0 bg-gray-900/60 pointer-events-none z-[-1]"></div>

            <div id="app-wrapper" className="max-w-[1440px] mx-auto bg-gray-50 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] md:rounded-2xl overflow-hidden min-h-screen bg-comic-pattern border-x-4 border-gray-800">
                <Navbar />
                <Reveal><Hero /></Reveal>
                <Reveal><FlashSale /></Reveal>
                <Reveal><UniverseSection /></Reveal>
                <Reveal><ProductGrid /></Reveal>
                <Reveal><AboutSection /></Reveal>
                <Reveal><Footer /></Reveal>

                {isCartOpen && <CartModal />}
                {quickViewId && <QuickViewModal />}
                <WishlistModal />
                <OrdersModal />
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                <CheckoutSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />

                <button
                    id="back-to-top"
                    onClick={scrollToTop}
                    className={`fixed bottom-24 right-8 z-[75] transition-all duration-500 transform hover:scale-110 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="w-16 h-16 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_15px_15px_rgba(220,38,38,0.6)] transition-all">
                        <img
                            src="https://i.pinimg.com/736x/6e/05/0b/6e050b6a75fcfec5c9dac4d6c0ae60e6.jpg"
                            alt="Back to Top"
                            className="w-full h-full object-cover rounded-xl rotate-3 hover:rotate-0 transition-all duration-300"
                            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} // Hexagon shape for 3D feel
                        />
                    </div>
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ShopProvider>
                <Toaster position="top-center" toastOptions={{
                    style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid #dc2626',
                    },
                    success: {
                        iconTheme: {
                            primary: '#dc2626',
                            secondary: '#fff',
                        },
                    },
                }} />
                <AppContent />
            </ShopProvider>
        </ThemeProvider>
    );
}

export default App;
