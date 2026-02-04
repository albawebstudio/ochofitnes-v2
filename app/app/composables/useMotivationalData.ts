import { ref } from 'vue'

import type { Quote, Motivational } from '~/models/motivational'

export const useMotivationalData = () => {
    const quotes = ref<Quote[]>([
        {
            quote: 'At that point in life where your talent meets the needs of the world, that is where God wants you to be.',
            author: 'Albert Schweitzer',
            nominal_title: 'Nobel Prize Theologian',
            className: 'bg-blue-600',
        },
        {
            quote: 'Lack of activity destroys the good condition of every human being, while movement and methodical physical exercise save it and preserve it.',
            author: 'Plato',
            nominal_title: 'Greek Philosopher',
            className: 'bg-pink-400',
        }
    ])
    const motivational = ref<Motivational>({
        quotes: quotes.value,
    })


    return {
        quotes,
        motivational,
    }
}
