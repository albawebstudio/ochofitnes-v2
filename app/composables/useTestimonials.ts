import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getI18nArray, useI18nObject } from "~/composables/useI18nContent"

import type { Review, Testimonial, I18nReview } from '~/models/testimonial'

export function useTestimonialsData() {
    const { t } = useI18n()

    const reviewsAuthorData = [
        { id: 1, author: "Kathi", image: null },
        { id: 2, author: "Ryan M.", image: { src: "/clients/ryan-m.jpg", alt: "Ryan M." }},
        { id: 3, author: "Mark and Karen D.", image: null },
        { id: 4, author: "Bruce D.", image: { src: "/clients/bruce-d.jpg", alt: "Bruce D." }},
        { id: 5, author: "Tony C.", image: null },
        { id: 6, author: "Dr. Michael F.", image: null },
        { id: 7, author: "Andrew A.", image: { src: "/clients/andrew-a.jpg", alt: "Andrew A." }}
    ];

    // Get structured reviews from i18n
    const reviewsFromI18n = useI18nObject<I18nReview[]>('testimonial.reviews')

    // Merge i18n reviews with author data
    const reviews = computed<Review[]>(() => {
        return reviewsFromI18n.value.map(review => {
            const authorData = reviewsAuthorData.find(author => author.id === review.id)

            if (!authorData) {
                console.warn(`No author data found for review id ${review.id}`)
                return {
                    ...review,
                    author: `Author ${review.id}`,
                    image: null
                }
            }

            return {
                id: review.id,
                title: review.title,
                content: review.content,
                author: authorData.author,
                image: authorData.image,
            }
        })
    })

    // Make testimonial computed to maintain reactivity
    const testimonial = computed<Testimonial>(() => ({
        title: t('testimonial.title'),
        content: getI18nArray('testimonial.content'),
        reviews: reviews.value
    }))

    const getTestimonialById = (id: number) => {
        return reviews.value.find(review => review.id === id)
    }

    return {
        testimonial,
        reviews,
        getTestimonialById
    }
}
