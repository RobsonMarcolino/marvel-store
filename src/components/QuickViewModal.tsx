import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { comics } from '../data/comics';

export const QuickViewModal = () => {
    const { quickViewId, closeQuickView, addToCart, reviews, addReview, openQuickView } = useShop();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    if (quickViewId === null) return null;

    const comic = comics.find(c => c.id === quickViewId);
    if (!comic) return null;

    const comicReviews = reviews[quickViewId] || [];

    const handleReviewSubmit = () => {
        if (rating === 0 || !reviewText) {
            alert('Por favor, dê uma nota e escreva um comentário.');
            return;
        }
        addReview(quickViewId, {
            rating,
            text: reviewText,
            date: new Date().toLocaleDateString()
        });
        setRating(0);
        setReviewText('');
    };

    // Get related comics
    let relatedComics = comics
        .filter(c => c.category === comic.category && c.id !== comic.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    if (relatedComics.length === 0) {
        const others = comics.filter(c => c.id !== comic.id).sort(() => 0.5 - Math.random()).slice(0, 3);
        relatedComics = others;
    }

    return (
        <div className="fixed inset-0 bg-black/80 z-[70] flex justify-center items-center p-4 backdrop-blur-sm transition-opacity" onClick={(e) => e.target === e.currentTarget && closeQuickView()}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col relative modal-content">
                <button onClick={closeQuickView} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 z-20 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all sticky">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center p-8 relative overflow-hidden min-h-[300px]">
                        <div className="absolute inset-0 bg-comic-pattern opacity-30"></div>
                        <img src={comic.image} alt={comic.title} className="max-h-[80vh] w-auto object-contain shadow-2xl rounded-lg transform transition-transform hover:scale-105 duration-500 relative z-10" />
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white relative">
                        <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 bg-red-50 w-fit px-2 py-1 rounded">{comic.category}</span>
                        <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 leading-none">{comic.title}</h2>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400 text-lg">★★★★★</div>
                            <span className="text-gray-400 text-sm font-medium">(4.9)</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed font-sans border-l-4 border-red-600 pl-4">{comic.desc}</p>
                        <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
                            <span className={`text-3xl font-black ${comic.isSale ? 'text-red-600' : 'text-gray-900'}`}>
                                {comic.isSale ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm line-through text-gray-400">R$ {comic.price.toFixed(2).replace('.', ',')}</span>
                                        <span>R$ {comic.salePrice?.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                ) : (
                                    `R$ ${comic.price.toFixed(2).replace('.', ',')}`
                                )}
                            </span>
                            <button onClick={() => { addToCart(comic.id); closeQuickView(); }} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider shadow-lg transform active:scale-95 transition-all flex items-center gap-2 font-sans">
                                Adicionar
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white p-8 border-t border-gray-100">
                    <h3 className="text-xl text-gray-800 mb-6 font-bold tracking-wide flex items-center gap-2">
                        Avaliações dos Fãs <span className="text-gray-400 text-sm font-normal">({comicReviews.length})</span>
                    </h3>

                    <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
                        {comicReviews.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">Seja o primeiro a avaliar!</p>
                        ) : (
                            comicReviews.map((r, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-yellow-400 text-sm tracking-widest">{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</span>
                                        <span className="text-xs text-gray-400">{r.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-sans">{r.text}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-700 uppercase mb-3">Deixe sua opinião</h4>
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setRating(star)} className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
                            ))}
                        </div>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-sm mb-3 font-sans"
                            rows={2}
                            placeholder="O que você achou dessa HQ?"
                        ></textarea>
                        <button onClick={handleReviewSubmit} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition">
                            Publicar Avaliação
                        </button>
                    </div>
                </div>

                {/* Related Section */}
                <div className="bg-gray-50 p-8 border-t border-gray-200">
                    <h3 className="text-xl text-gray-800 mb-4 font-bold tracking-wide">Quem viu, também gostou:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {relatedComics.map(r => (
                            <div key={r.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition" onClick={() => openQuickView(r.id)}>
                                <img src={r.image} className="w-full h-32 object-cover rounded mb-2" alt={r.title} />
                                <h4 className="text-xs font-bold text-gray-800 line-clamp-1 font-sans">{r.title}</h4>
                                <span className="text-xs font-bold text-gray-600">
                                    {r.isSale ? (
                                        <span className="text-red-600 font-bold">R$ {r.salePrice?.toFixed(2)}</span>
                                    ) : (
                                        `R$ ${r.price.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
