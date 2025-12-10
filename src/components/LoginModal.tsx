import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSound, SOUNDS } from '../hooks/useSound';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { login, register } = useShop();
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [playSuccess] = useSound(SOUNDS.SUCCESS);
    const [playClick] = useSound(SOUNDS.CLICK);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            let success = false;
            if (isRegistering) {
                if (!name || !email || !password) {
                    setError('Preencha todos os campos.');
                    setIsLoading(false);
                    return;
                }
                success = await register(name, email, password);
                if (!success) setError('Email já cadastrado.');
            } else {
                if (!email || !password) {
                    setError('Preencha email e senha.');
                    setIsLoading(false);
                    return;
                }
                success = await login(email, password);
                if (!success) setError('Email ou senha incorretos.');
            }

            if (success) {
                playSuccess();
                onClose();
                // Reset form
                setName('');
                setEmail('');
                setPassword('');
                setError('');
            }
        } catch (err) {
            setError('Erro ao conectar com a S.H.I.E.L.D.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        playClick();
        setIsRegistering(!isRegistering);
        setError('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-modalFadeIn border-2 border-red-600">
                <div className="bg-red-600 p-4 text-center relative">
                    <h2 className="text-2xl font-bold text-white marvel-font tracking-wider">
                        {isRegistering ? 'NOVO AGENTE' : 'IDENTIFICAÇÃO S.H.I.E.L.D.'}
                    </h2>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-300 dark:border-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegistering && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nome do Agente</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                                    placeholder="Ex: Tony Stark"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email Confidencial</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                                placeholder="tony@stark.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Senha de Acesso</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg mt-4 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                isRegistering ? 'Cadastrar Agente' : 'Acessar Sistema'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 font-bold transition-colors"
                        >
                            {isRegistering ? 'Já tem conta? Faça Login' : 'Novo por aqui? Crie sua conta'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
