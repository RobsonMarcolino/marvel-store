import { useState, useEffect } from 'react';
import { heroSlides } from '../data/slides';
import { useShop } from '../context/ShopContext';

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { openQuickView } = useShop();

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((currentSlide + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const setSlide = (index: number) => {
        if (index === currentSlide) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsAnimating(false);
        }, 300);
    };

    const slide = heroSlides[currentSlide];

    return (
        <header className="relative bg-gray-900 h-[650px] overflow-hidden flex items-center shadow-2xl group pt-24" id="hero-section">
            {/* Background */}
            <div
                id="hero-bg"
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105 ${isAnimating ? 'opacity-0' : 'opacity-60 md:opacity-40'}`}
                style={{ backgroundImage: `url('${slide.img}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/30 md:bg-gradient-to-r md:from-gray-900 md:via-gray-900/90 md:to-transparent"></div>

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 h-full">
                <div
                    id="hero-content"
                    className={`flex-1 text-center md:text-left transition-opacity duration-500 pt-10 md:pt-0 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider shadow-lg">{slide.tag}</div>
                    <h1 className="text-6xl md:text-8xl text-white mb-4 leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] font-black tracking-wider uppercase" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto md:mx-0 font-sans font-light">{slide.desc}</p>
                    <button onClick={() => openQuickView(slide.id)} className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-105 shadow-lg uppercase tracking-wide font-sans">Ver Detalhes</button>
                </div>

                <div className="hidden md:flex flex-1 justify-center perspective-1000 h-full items-center relative">
                    <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-20 rounded-full animate-pulse"></div>
                    <img
                        src={slide.img}
                        alt="Cover"
                        className={`w-[340px] rounded-lg shadow-2xl rotate-y-12 hover:rotate-y-0 transition-all duration-700 border-4 border-white/10 hover:border-red-600 relative z-10 ${isAnimating ? 'opacity-0 translate-y-20 rotate-y-10' : 'opacity-100 rotate-y-12'}`}
                    />
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={`w-3 h-3 rounded-full bg-white transition slide-dot ${currentSlide === index ? 'active opacity-100 scale-125' : 'opacity-50'}`}
                    ></button>
                ))}
            </div>
        </header>
    );
};
