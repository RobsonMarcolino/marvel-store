import { useState, useEffect } from 'react';
import { comics } from '../data/comics';
import { useShop } from '../context/ShopContext';
import { ComicCard } from './ComicCard';
import { CharacterFilter } from './CharacterFilter';
import { SkeletonCard } from './SkeletonCard';

export const ProductGrid = () => {
    const { searchQuery, selectedCategory, setSelectedCategory, selectedCharacter } = useShop();
    const [visibleLimit, setVisibleLimit] = useState(8);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredComics = comics.filter(c => {
        const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
        const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchChar = !selectedCharacter || c.title.toLowerCase().includes(selectedCharacter.replace('-', ' '));
        return matchCat && matchSearch && matchChar;
    });

    const comicsToShow = filteredComics.slice(0, visibleLimit);

    const loadMore = () => {
        setVisibleLimit(prev => prev + 4);
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-6 pb-24 relative z-10 min-h-[400px]">
            <div className="flex items-center justify-center mb-8 relative reveal active">
                <h2 className="text-5xl text-gray-900 dark:text-white text-center relative z-10 px-8 bg-gray-50 dark:bg-gray-900 uppercase tracking-wide transform skew-x-[-5deg] transition-colors">
                    HQs Mais Vendidas
                </h2>
                <div className="absolute w-full h-1 bg-gray-300 dark:bg-gray-700 top-1/2 left-0 -z-0"></div>
            </div>

            <CharacterFilter />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="products-grid">
                {isLoading ? (
                    // Render 8 skeletons while loading
                    Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : comicsToShow.length > 0 ? (
                    comicsToShow.map((comic) => (
                        <ComicCard key={comic.id} comic={comic} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
                        <div className="text-6xl mb-4 grayscale opacity-50">🕷️</div>
                        <p className="text-2xl text-gray-400 font-bold font-sans mb-2">Nenhum gibi encontrado...</p>
                        <button onClick={() => setSelectedCategory('all')} className="text-red-600 font-bold hover:text-red-800 font-sans border-b-2 border-red-600 pb-1">
                            Ver todos os produtos
                        </button>
                    </div>
                )}
            </div>

            {!isLoading && visibleLimit < filteredComics.length && (
                <div className="text-center mt-12">
                    <button
                        onClick={loadMore}
                        className="bg-gray-900 text-white font-bold py-3 px-10 rounded-full hover:bg-red-600 transition-colors shadow-lg uppercase tracking-wider transform hover:scale-105 active:scale-95"
                    >
                        Ver Mais HQs
                    </button>
                </div>
            )}
        </section>
    );
};
