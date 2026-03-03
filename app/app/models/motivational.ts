export interface Quote {
    quote: string;
    author: string;
    nominal_title: string;
    className: string;
}
export interface Motivational {
    quotes: Quote[];
}
