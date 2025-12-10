import { useShop } from '../context/ShopContext';
import { useSound, SOUNDS } from '../hooks/useSound';

const CHARACTERS = [
    { id: 'spider-man', name: 'Spider-Man', img: 'https://i.pinimg.com/1200x/97/dd/88/97dd885f74575423a40c9f2843598996.jpg' },
    { id: 'iron-man', name: 'Iron Man', img: 'https://i.pinimg.com/736x/b7/9d/56/b79d56e4132f2cdc3483b8f4aa64192d.jpg' },
    { id: 'captain-america', name: 'Captain America', img: 'https://i.pinimg.com/736x/2d/8e/a8/2d8ea876fb21bba1575c7a2bf0905eba.jpg' },
    { id: 'thor', name: 'Thor', img: 'https://i.pinimg.com/736x/bd/15/17/bd15178dd3802f33fade4b34006ab078.jpg' },
    { id: 'hulk', name: 'Hulk', img: 'https://i.pinimg.com/736x/e4/ba/f5/e4baf554c9950a03c9edad637896d6f1.jpg' },
    { id: 'wolverine', name: 'Wolverine', img: 'https://i.pinimg.com/736x/df/89/6e/df896eff67bca6f6d2bc5a7d12d42024.jpg' },
    { id: 'deadpool', name: 'Deadpool', img: 'https://i.pinimg.com/736x/4f/9a/f4/4f9af461ad42694b74e2185f20179f32.jpg' },
];

export const CharacterFilter = () => {
    const { selectedCharacter, setSelectedCharacter } = useShop();
    const [playClick] = useSound(SOUNDS.CLICK);

    const handleSelect = (charId: string) => {
        playClick();
        if (selectedCharacter === charId) {
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter(charId);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-5xl text-white mb-10 text-center font-black tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] uppercase">
                Filtrar por <span className="text-red-600">Personagem</span>
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x md:justify-center">
                {CHARACTERS.map(char => (
                    <div
                        key={char.id}
                        onClick={() => handleSelect(char.id)}
                        className={`flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group snap-center transition-all duration-300 ${selectedCharacter === char.id ? 'scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                    >
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-colors shadow-lg ${selectedCharacter === char.id ? 'border-red-600 shadow-red-600/50' : 'border-gray-700 group-hover:border-white'}`}>
                            <img src={char.img} alt={char.name} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${selectedCharacter === char.id ? 'text-red-500' : 'text-gray-400 group-hover:text-white'}`}>
                            {char.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
