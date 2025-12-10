export interface Comic {
    id: number;
    title: string;
    price: number;
    salePrice?: number;
    isSale?: boolean;
    image: string;
    category: string;
    desc: string;
    badge?: string;
}

export interface Slide {
    id: number;
    title: string;
    desc: string;
    img: string;
    tag: string;
}

export interface CartItem extends Comic {
    qty: number;
}

export interface Review {
    rating: number;
    text: string;
    date: string;
}
