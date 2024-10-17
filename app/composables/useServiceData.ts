import { ref } from 'vue'

import type { Service } from '~/models/service'
import type { ServiceItem } from '~/models/service-item'

export function useServiceData() {
    const service_items = ref<ServiceItem[]>([
        {
            title: "Sports Massage",
            content: [
                "Sports massage helps alleviate delayed onset muscle soreness (DOMS) after intense workouts, loosens tight muscles and enhances joint mobility and boosts circulation to promote faster healing of muscle tissues."
            ],
            img: {
                src: "/class/sports-massage.jpg",
                alt: "Sports Massage"
            },
            price: {
                amount: 60.00,
                currency: "USD",
                unit: {
                    measure: "minutes",
                    quantity: 30
                },
                formattedValue: "$50",
            },
            list: [
                "$115 for 60 minutes",
                "Reduces Muscle Soreness",
                "Improves Flexibility and Range of Motion",
                "Speeds Up Recovery",
                "Prevents Injuries",
                "Relieves Stress and Tension",
                "Enhances Athletic Performance",
                "Boosts Circulation",
                "Reduces Scar Tissue and Adhesions"
            ]
        },
        {
            title: "Small Group",
            content: [
                "Get the benefits of individual coaching while training with others. Small group training allows you to stay motivated by working alongside like-minded individuals with similar goals."
            ],
            img: {
                src: "/class/small-group-class.jpg",
                alt: "Small Group Classes"
            },
            price: {
                amount: 50.00,
                currency: "USD",
                unit: {
                    measure: "minutes",
                    quantity: 60
                },
                formattedValue: "$50",
            },
            list: [
                "Personalized Attention in a Group Setting",
                "Motivation and Accountability",
                "Fun and Engaging Workouts",
                "Affordable Coaching",
                "Varied and Balanced Training ",
                "Build Community",
                "Adaptable for All Levels",
                "Boosts Consistency"
            ]
        },
        {
            title: "Individual Training",
            content: [
                "Tailored programs designed to meet your specific fitness goals and needs. Receive undivided attention and guidance from a certified trainer. Stay on course with personalized feedback and goal adjustments."
            ],
            img: {
                src: "/class/sports-specific-class.jpg",
                alt: "Individual Training"
            },
            price: {
                amount: 60.00,
                currency: "USD",
                unit: {
                    measure: "minutes",
                    quantity: 30
                },
                formattedValue: "$60",
            },
            list: [
                "$100 for 60 minutes",
                "Customized Workouts",
                "One-on-One Coaching",
                "Progress Tracking",
                "Efficient Workouts",
                "Injury Prevention and Recovery",
                "Flexible Scheduling",
                "Boosts Confidence",
                "Accountability and Motivation"
            ]
        },
        {
            title: "Online Training",
            content: [
                "Enjoy the flexibility of training from the comfort of your home or while traveling. Get customized programs tailored to your goals and fitness level, just like in-person sessions. Receive real-time guidance and corrections during virtual sessions."
            ],
            img: {
                src: "/class/online-training.jpg",
                alt: "Online Training"
            },
            price: {
                amount: 50.00,
                currency: "USD",
                unit: {
                    measure: "minutes",
                    quantity: 30
                },
                formattedValue: "$50",
            },
            list: [
                "Train Anywhere, Anytime",
                "Personalized Workouts",
                "Live Coaching and Feedback",
                "Cost-Effective",
                "Progress Monitoring",
                "Increased Accountability",
                "Access to Expert Coaching",
                "Convenient for Busy Schedules"
            ]
        }
    ])

    const service = ref<Service>({
        title: "Services",
        content: [
            "Ocho Fitness offers personalized training, group sessions, and sports massage to help you move better, get stronger, and stay pain-free. Whether in-person or online, we tailor every session to fit your goals. Explore our options below and find the right fit for your fitness journey!",
        ],
        items: service_items.value
    })

    return {
        service
    }
}


