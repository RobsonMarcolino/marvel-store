import type { Comic } from '../types';
import { useShop } from '../context/ShopContext';
import Tilt from 'react-parallax-tilt';
import { useSound, SOUNDS } from '../hooks/useSound';

interface ComicCardProps {
    comic: Comic;
}

export const ComicCard = ({ comic }: ComicCardProps) => {
    const { addToCart, toggleWishlist, wishlist, openQuickView } = useShop();
    const isWishlisted = wishlist.includes(comic.id);
    const [playHover] = useSound(SOUNDS.HOVER, 0.2);
    const [playAdd] = useSound(SOUNDS.ADD_TO_CART);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(comic.id);
        playAdd();
    };

    return (
        <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.05}
            transitionSpeed={2500}
            className="h-full"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col relative comic-card border border-gray-100 dark:border-gray-700"
                onClick={() => openQuickView(comic.id)}
                onMouseEnter={() => playHover()}
            >
                {comic.isSale && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-br-lg shadow-md z-10 animate-pulse">50% OFF</div>
                )}
                {!comic.isSale && comic.badge && (
                    <div className="absolute top-0 left-0 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-br-lg shadow-md z-10">{comic.badge}</div>
                )}

                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(comic.id); }}
                    className={`absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition shadow-sm ${isWishlisted ? 'text-red-600' : 'text-gray-400'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                <div className="h-80 overflow-hidden relative bg-gray-100">
                    <img
                        src={comic.image}
                        alt={comic.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">Ver Detalhes</span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-bold">{comic.category}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-red-600 transition-colors marvel-font tracking-wide">{comic.title}</h3>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col">
                            {comic.salePrice && (
                                <span className="text-xs text-gray-400 line-through">R$ {comic.price.toFixed(2)}</span>
                            )}
                            <span className="text-2xl font-black text-gray-900 dark:text-white">
                                R$ {(comic.salePrice || comic.price).toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-900 dark:bg-red-600 text-white p-3 rounded-full hover:bg-red-600 dark:hover:bg-red-700 transition-all transform hover:scale-110 shadow-md active:scale-95"
                            title="Adicionar ao Carrinho"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};
