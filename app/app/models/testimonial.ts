export interface Testimonial {
    title: string
    content: string[]
    reviews: Review[]
}

export interface Review {
    id: number
    title: string
    content: string
    author: string
    image: object | null
}

// Type for the i18n review structure
export interface I18nReview {
    id: number
    title: string
    content: string
}
