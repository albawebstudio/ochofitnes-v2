import type { Image, Price } from './common';

export interface ServiceItem {
    title: string;
    content: string[];
    img: Image;
    price: Price;
    list: string[];
}
