
import { useShop } from '../context/ShopContext';
import { useSound, SOUNDS } from '../hooks/useSound';

export const Footer = () => {
    const { setIsLoginOpen } = useShop();
    const [playClick] = useSound(SOUNDS.CLICK);

    const handleSubscribe = () => {
        playClick();
        setIsLoginOpen(true);
    };
    return (
        <>
            <section className="relative bg-gray-50 py-24 overflow-hidden border-b-8 border-red-600">
                <div className="absolute inset-0 bg-comic-pattern opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-white/80 to-transparent"></div>
                <div className="w-full max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block animate-pulse">Newsletter Oficial</span>
                    <h2 className="text-5xl md:text-7xl text-gray-900 mb-6 font-bold tracking-wide leading-none">
                        Junte-se ao <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Multiverso</span>
                    </h2>
                    <div className="flex justify-center gap-4 max-w-md mx-auto">
                        <button
                            onClick={handleSubscribe}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-xl font-sans hover:shadow-red-600/30"
                        >
                            Inscrever-se
                        </button>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-950 text-white py-10 relative z-20 border-t border-gray-800">
                <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans text-gray-400">
                    <p>© 2024 Marvel Comics Store. Desenvolvido por Robson Marcolino.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-red-500">Termos</a>
                        <a href="#" className="hover:text-red-500">Privacidade</a>
                    </div>
                </div>
            </footer>
        </>
    );
};
