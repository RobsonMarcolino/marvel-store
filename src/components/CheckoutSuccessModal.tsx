import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSound, SOUNDS } from '../hooks/useSound';

interface CheckoutSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutSuccessModal = ({ isOpen, onClose }: CheckoutSuccessModalProps) => {
    const [playSuccess] = useSound(SOUNDS.SUCCESS);

    useEffect(() => {
        if (isOpen) {
            playSuccess();
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            const random = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isOpen, playSuccess]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-gray-900 border-2 border-green-500 rounded-2xl p-8 max-w-md w-full relative z-10 text-center shadow-[0_0_50px_rgba(34,197,94,0.3)] transform animate-bounce-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">Missão Cumprida!</h2>
                <p className="text-gray-300 mb-8">Seu pedido foi confirmado e seus equipamentos já estão sendo preparados para envio.</p>

                <button
                    onClick={onClose}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 shadow-lg uppercase tracking-wider"
                >
                    Continuar Explorando
                </button>
            </div>
        </div>
    );
};
