import { useShop } from '../context/ShopContext';
import { comics } from '../data/comics';

export const WishlistModal = () => {
    const { wishlist, isWishlistOpen, toggleWishlistModal, toggleWishlist, addToCart } = useShop();

    if (!isWishlistOpen) return null;

    const wishlistItems = comics.filter(comic => wishlist.includes(comic.id));

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex justify-end transition-opacity duration-300 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
                {/* Header */}
                <div className="bg-gray-900 text-white p-6 flex justify-between items-center shadow-md border-b-4 border-red-600 shrink-0">
                    <h2 className="text-2xl font-bold flex items-center gap-2 tracking-wide font-sans">
                        <span className="text-red-600">SEUS</span> FAVORITOS
                    </h2>
                    <button onClick={toggleWishlistModal} className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 cart-scroll bg-gray-50 dark:bg-gray-800">
                    {wishlistItems.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Lista Vazia!</p>
                            <p className="text-sm">Salve seus quadrinhos favoritos aqui.</p>
                        </div>
                    ) : (
                        wishlistItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm relative group">
                                <img src={item.image} className="w-16 h-24 object-cover rounded-md shadow-sm" alt={item.title} />
                                <div className="flex-1 font-sans">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{item.title}</h4>
                                    <div className="text-red-600 font-bold text-sm mb-2">
                                        R$ {(item.salePrice || item.price).toFixed(2).replace('.', ',')}
                                    </div>
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-full font-bold hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wide"
                                    >
                                        Adicionar ao Carrinho
                                    </button>
                                </div>
                                <button
                                    onClick={() => toggleWishlist(item.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remover dos favoritos"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
