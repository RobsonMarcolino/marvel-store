import { useState, useEffect } from 'react';
import { comics } from '../data/comics';
import { useShop } from '../context/ShopContext';

export const FlashSale = () => {
    const { openQuickView } = useShop();
    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 0, seconds: 0 });

    useEffect(() => {
        const now = new Date();
        const target = new Date(now);
        target.setHours(target.getHours() + 4 - (target.getHours() % 4));
        target.setMinutes(0);
        target.setSeconds(0);

        const interval = setInterval(() => {
            const current = new Date();
            const diff = target.getTime() - current.getTime();

            if (diff <= 0) {
                // In a real app, we'd reset the target properly
            }

            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const saleItems = comics.filter(c => c.isSale);

    return (
        <section className="bg-yellow-400 py-6 relative overflow-hidden border-b-4 border-black shadow-lg">
            <div className="w-full max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-black text-yellow-400 p-2 rounded-full animate-bounce shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="font-black text-2xl text-black leading-none uppercase italic tracking-wide">Oferta Relâmpago!</h3>
                        <p className="text-black font-bold text-xs uppercase tracking-wider">50% OFF em Itens Selecionados</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-black font-black text-2xl font-mono bg-white/30 px-6 py-2 rounded-lg border-2 border-black shadow-inner">
                    <div className="text-center w-12">
                        <span>{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[10px] block font-sans font-bold -mt-1">HRS</span>
                    </div>
                    <span>:</span>
                    <div className="text-center w-12">
                        <span>{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[10px] block font-sans font-bold -mt-1">MIN</span>
                    </div>
                    <span>:</span>
                    <div className="text-center w-12">
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[10px] block font-sans font-bold -mt-1">SEG</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {saleItems.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 cursor-pointer hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openQuickView(item.id)}>
                            <img src={item.image} className="w-16 h-20 object-cover rounded border-2 border-black" alt={item.title} />
                            <div>
                                <h4 className="font-bold text-sm text-black leading-tight mb-1">{item.title}</h4>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 line-through font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                                    <span className="text-red-600 font-black text-lg leading-none">R$ {item.salePrice?.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                            <div className="ml-auto bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded rotate-3">-50%</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/comic-dots.png')]"></div>
        </section>
    );
};
