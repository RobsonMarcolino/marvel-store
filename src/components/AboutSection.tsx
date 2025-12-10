
export const AboutSection = () => {
    return (
        <section id="about-section" className="relative py-24 reveal active overflow-hidden border-t border-gray-800">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-bg" style={{ backgroundImage: "url('https://i.pinimg.com/736x/f2/db/0a/f2db0a8452fab4aadfed4eb97f84f2d1.jpg')" }}></div>
            <div className="absolute inset-0 bg-gray-900/85"></div>
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-center md:text-left">
                    <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-2 block font-sans">Nossa Missão</span>
                    <h2 className="text-5xl md:text-6xl text-white mb-6 drop-shadow-lg leading-tight">
                        Mais que uma loja,<br />um <span className="text-red-600">Legado.</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed font-sans font-light">
                        Desde 2025, a Marvel Comics Store conecta fãs de todas as gerações aos momentos mais icônicos do universo dos quadrinhos.
                    </p>
                    <p className="text-gray-400 text-base italic border-l-4 border-red-600 pl-4 font-sans">
                        "Quadrinhos são a nossa mitologia moderna." – Stan Lee
                    </p>
                </div>
                <div className="flex-1 flex justify-center relative">
                    <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-[0_0_40px_rgba(237,29,36,0.2)] border-4 border-gray-800 transform hover:scale-105 transition-transform duration-500">
                        <img src="https://i.pinimg.com/originals/59/07/ad/5907ad9e817ee862ed10f54490207523.gif" className="w-full h-full object-cover" alt="Excelsior" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 text-white font-bangers tracking-wide text-2xl drop-shadow-md">Excelsior!</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
