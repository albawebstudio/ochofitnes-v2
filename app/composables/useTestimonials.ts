import { ref } from 'vue'

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

export function useTestimonialsData() {
    const reviews = ref<Review[]>([
        {
            id: 1,
            title: "Feeling Better and Moving Freely Again!",
            content: "Since I have been going to Jovani for a massage I have notice positive changes. My back is not so stiff. My body just feels better. I am able to move more easily. I strongly recommend Jovani.",
            author: "Kathi",
            image: null,
        },
        {
            id: 2,
            title: "Transformative Training for a Healthier Life",
            content: "I've had the pleasure of training with Jovani for four years now, and the decision has been one of the more impactful decisions I've made for my overall health. The most valuable trait Jovani possesses as an effective trainer is that he knows me. He knows how to adjust workouts within the session as necessary, but most importantly, how to push to get the most out of me. Training with Jovani has provided me with a framework for a healthier lifestyle, and I am so thankful to have the opportunity to work with him.",
            author: "Ryan M.",
            image: {
                src: "/clients/ryan-m.jpg",
                alt: "Ryan M."
            },
        },
        {
            id: 3,
            title: "Stronger, Healthier, and Pain-Free in Our 60s",
            content: "I have been training with Jovani Morales for eight years. My wife joined the training four years ago. We train with him three days per week. Jovani's education and previous experience working with a chiropractor translate to a thorough understanding of the human anatomy when giving messages. He tailors his workouts to our individual needs and accommodates pains, ailments, or issues we may have that week or month. His knowledge of muscle groups and the exercises we need to address our issues is astounding. I was physically a mess when I started with him, and today in my 60's I have much more flexibility and strength. Jovani is a unique and gifted trainer who always has an upbeat and encouraging attitude. If you cannot tell, we highly recommend him!",
            author: "Mark and Karen D.",
            image: null,
        },
        {
            id: 4,
            title: "A Journey Back to Health and Positivity",
            content: "I met Jovani Morales in 2016 when he be became my personal trainer at YMCA in Woodbury, MN. He was responsible for helping me return to good physical health after years of neglect on my part. This included exercise with massage therapy afterwards. Jovani gave me a new positive mental attitude which has helped guide me as I have grown older. I highly recommend him to others who wish to return to good physical health.",
            author: "Bruce D.",
            image: {
                src: "/clients/bruce-d.jpg",
                alt: "Bruce D."
            },
        },
        {
            id: 5,
            title: "Expert Training with a Personalized Touch",
            content: "Jovani is an exceptional trainer. Not only does he make sure the skills are being done properly to maximize the benefit, he also takes into account a client's injuries/limitations when he sets out the day's workout plan.",
            author: "Tony C.",
            image: null,
        },
        {
            id: 6,
            title: "Motivating, Well-Designed, and Ever-Changing Workouts",
            content: "I have known Jovani and worked with him for more than 4 years. He comes to each session with a well thought out workout plan. He understands how to motivate you to get the most out of each session which helps one progress. The workouts are a good combination of aerobic and strength training and varies to keep from getting board!",
            author: "Dr. Michael F.",
            image: null,
        },
        {
            id: 7,
            title: "Personalized Training with Encouragement and Friendship",
            content: "Working with Jovani has been a fantastic experience. He listens to my concerns and provides a workout tailored to my needs. His constant encouragement motivates me. Jovani continues to make me stronger and in the process has become a friend.",
            author: "Andrew A.",
            image: {
                src: "/clients/andrew-a.jpg",
                alt: "Andrew A."
            },
        }
    ])

    const testimonial = ref<Testimonial>({
        title: "What Our Clients Are Saying",
        content: [
            "At Ocho Fitness, we take pride in helping our clients move better, feel stronger, and stay pain-free. Whether through personal training, sports massage, or online coaching, our goal is to support each person’s unique journey. But don’t just take our word for it—here’s what our clients have to say about their experience with us!",
        ],
        reviews: reviews.value
    })

    const getTestimonialById = (id: number) => {
        return reviews.value.find(review => review.id === id)
    }

    return {
        testimonial,
        reviews,
        getTestimonialById
    }
}
