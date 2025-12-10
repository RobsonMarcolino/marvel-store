import { useShop } from '../context/ShopContext';

export const UniverseSection = () => {
    const { setSelectedCategory } = useShop();

    const categories = [
        { name: 'Avengers', label: 'Vingadores', img: 'https://i.pinimg.com/1200x/67/da/b2/67dab2b7eb22da9573697e5c7e85078a.jpg', color: 'group-hover:text-red-500' },
        { name: 'X-Men', label: 'X-Men', img: 'https://i.pinimg.com/736x/d4/f1/3f/d4f13f1c526460f21b1b02cd5d98f807.jpg', color: 'group-hover:text-yellow-400' },
        { name: 'Star Wars', label: 'Star Wars', img: 'https://i.pinimg.com/1200x/c0/ef/e5/c0efe5572f25476d454548374f04f18a.jpg', color: 'group-hover:text-blue-400' },
        { name: 'Avengers', label: 'Secret Wars', img: 'https://i.pinimg.com/1200x/01/7f/e8/017fe89a9d7cfc606454f4b4264d5a04.jpg', color: 'group-hover:text-purple-400' },
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
            <h2 className="text-5xl text-white mb-10 text-center font-black tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] uppercase">
                Explore por <span className="text-red-600">Universos</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(cat.name)}
                        className="relative h-40 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all border-2 border-gray-800 overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${cat.img}')` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <span className={`relative z-10 text-white font-black text-2xl uppercase tracking-widest drop-shadow-md transition-colors ${cat.color}`}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};
