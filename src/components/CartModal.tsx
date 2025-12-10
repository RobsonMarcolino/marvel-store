import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { useSound, SOUNDS } from '../hooks/useSound';
import toast from 'react-hot-toast';

const VALID_COUPONS: Record<string, number> = {
    STANLEE: 20,
    MARVEL10: 10,
};

export const CartModal = () => {
    const { cart, isCartOpen, toggleCart, updateCartQty, removeFromCart, clearCart, user, addXp, setIsSuccessOpen, setIsLoginOpen, addOrder } = useShop();
    const [view, setView] = useState<'list' | 'checkout' | 'success'>('list');
    const [couponCode, setCouponCode] = useState('');
    const [activeCoupon, setActiveCoupon] = useState<{ code: string; discount: number } | null>(null);
    const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [playSuccess] = useSound(SOUNDS.SUCCESS);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        card: '',
        expiry: '',
        cvv: ''
    });

    if (!isCartOpen) return null;

    const subtotal = cart.reduce((acc, item) => {
        const price = item.isSale ? (item.salePrice || item.price) : item.price;
        return acc + price * item.qty;
    }, 0);

    const discountAmount = activeCoupon ? (subtotal * activeCoupon.discount) / 100 : 0;
    const total = subtotal - discountAmount;

    const applyCoupon = () => {
        const code = couponCode.trim().toUpperCase();
        if (!code) {
            setCouponMessage({ text: 'Digite um código de cupom', type: 'error' });
            return;
        }
        if (VALID_COUPONS[code]) {
            setActiveCoupon({ code, discount: VALID_COUPONS[code] });
            setCouponMessage({ text: `Cupom ${code} aplicado!`, type: 'success' });
        } else {
            setActiveCoupon(null);
            setCouponMessage({ text: 'Cupom inválido ou expirado', type: 'error' });
        }
    };

    const removeCoupon = () => {
        setActiveCoupon(null);
        setCouponCode('');
        setCouponMessage(null);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("Faça login para finalizar a missão!", {
                icon: '🔒',
                style: {
                    background: '#1f2937',
                    color: '#fff',
                    border: '1px solid #dc2626',
                }
            });
            toggleCart();
            setIsLoginOpen(true);
            return;
        }

        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            playSuccess();
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ED1D24', '#000000', '#ffffff'],
            });

            // Create Order
            const newOrder: any = {
                id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                date: new Date().toISOString(),
                items: [...cart],
                total: total,
                status: 'processing',
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // +5 days
            };
            addOrder(newOrder);

            // Gamification Logic
            if (user) {
                addXp(Math.floor(total));
            }

            clearCart();
            toggleCart();
            setIsSuccessOpen(true);
            setActiveCoupon(null);
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex justify-end transition-opacity duration-300 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
                {/* Header */}
                <div className="bg-gray-900 text-white p-6 flex justify-between items-center shadow-md border-b-4 border-red-600 shrink-0">
                    <h2 className="text-2xl font-bold flex items-center gap-2 tracking-wide font-sans">
                        <span className="text-red-600">SEU</span> CARRINHO
                    </h2>
                    <button onClick={toggleCart} className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* View 1: List */}
                {view === 'list' && (
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 cart-scroll bg-gray-50 dark:bg-gray-800">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center animate-pulse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Carrinho Vazio!</p>
                                    <p className="text-sm">Que tal adicionar alguns clássicos?</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                                        <img src={item.image} className="w-14 h-18 object-cover rounded-md" alt={item.title} />
                                        <div className="flex-1 font-sans">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</h4>
                                            <div className="text-red-600 font-bold text-sm">
                                                R$ {((item.isSale ? item.salePrice! : item.price) * item.qty).toFixed(2).replace('.', ',')}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-600 rounded-lg p-1">
                                            <button onClick={() => updateCartQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-500 rounded shadow text-gray-600 dark:text-white hover:text-red-600 font-bold">-</button>
                                            <span className="text-sm font-bold w-4 text-center text-gray-900 dark:text-white">{item.qty}</span>
                                            <button onClick={() => updateCartQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-500 rounded shadow text-gray-600 dark:text-white hover:text-green-600 font-bold">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <>
                                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Código do cupom"
                                            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            onKeyUp={(e) => e.key === 'Enter' && applyCoupon()}
                                        />
                                        <button onClick={applyCoupon} className="bg-gray-800 text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-700 transition whitespace-nowrap">
                                            Aplicar
                                        </button>
                                    </div>
                                    {couponMessage && (
                                        <div className={`mt-2 text-sm ${couponMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                            {couponMessage.text}
                                        </div>
                                    )}
                                    {activeCoupon && (
                                        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800 coupon-success">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold">Cupom aplicado!</span>
                                                <button onClick={removeCoupon} className="text-green-700 dark:text-green-400 hover:text-green-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-xs mt-1">Cupom <strong>{activeCoupon.code}</strong> aplicado: {activeCoupon.discount}% de desconto</div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] shrink-0">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold uppercase text-sm">Subtotal</span>
                                            <span className="text-xl font-bold text-gray-900 dark:text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                        {activeCoupon && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 dark:text-gray-400 font-bold uppercase text-sm">Desconto</span>
                                                <span className="text-xl font-bold text-green-600">-R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                                            <span className="text-gray-900 dark:text-white font-bold uppercase text-lg">Total</span>
                                            <span className="text-3xl font-black text-red-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setView('checkout')} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full shadow-lg transform transition active:scale-95 uppercase tracking-wider flex justify-center items-center gap-2 font-sans">
                                        Finalizar Compra
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* View 2: Checkout */}
                {view === 'checkout' && (
                    <div className="flex flex-col h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div className="p-6 space-y-6">
                            <button onClick={() => setView('list')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 flex items-center gap-1 font-bold mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar ao carrinho
                            </button>

                            <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
                                <h4 className="font-bold text-gray-700 dark:text-white mb-3">Resumo do Pedido</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Subtotal</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    {activeCoupon && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm">Desconto</span>
                                            <span className="text-sm font-bold text-green-600">-R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-700 dark:text-white">Total</span>
                                            <span className="font-black text-2xl text-red-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleCheckout} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Nome Completo</label>
                                    <input type="text" id="name" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none font-sans" placeholder="Steve Rogers" onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">E-mail</label>
                                    <input type="email" id="email" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none font-sans" placeholder="cap@avengers.com" onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Endereço de Entrega</label>
                                    <input type="text" id="address" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none font-sans" placeholder="Rua dos Heróis, 100" onChange={handleInputChange} />
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-600 mt-4">
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Dados do Cartão</label>
                                    <div className="space-y-3">
                                        <input type="text" id="card" required className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none font-sans" placeholder="0000 0000 0000 0000" maxLength={19} onChange={handleInputChange} />
                                        <div className="flex gap-3">
                                            <input type="text" id="expiry" required className="w-1/2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none font-sans" placeholder="MM/AA" maxLength={5} onChange={handleInputChange} />
                                            <input type="text" id="cvv" required className="w-1/2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none font-sans" placeholder="CVV" maxLength={3} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full shadow-lg transform transition active:scale-95 uppercase tracking-wider mt-6 flex justify-center">
                                    {isProcessing ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Pagar Agora'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
