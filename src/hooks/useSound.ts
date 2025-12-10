import { useCallback } from 'react';

// Simple sound hook using HTML5 Audio
// In a real app, you might want to use a library like use-sound for more features (sprites, etc.)
export const useSound = (url: string, volume: number = 0.5) => {
    const play = useCallback(() => {
        try {
            const audio = new Audio(url);
            audio.volume = volume;
            audio.play().catch(e => console.error("Error playing sound:", e));
        } catch (error) {
            console.error("Audio error:", error);
        }
    }, [url, volume]);

    return [play];
};

export const SOUNDS = {
    CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Pop sound
    HOVER: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Swoosh/Slide
    SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Success chime
    ADD_TO_CART: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // Coin/Item sound
    THEME_SWITCH: 'https://assets.mixkit.co/active_storage/sfx/2585/2585-preview.mp3', // Sci-fi switch
};
