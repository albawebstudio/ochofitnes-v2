import { ref } from 'vue'

import type { About, Profile } from '~/models/about'

export const useAboutData = () => {
    const profile = ref<Profile>( {
        img: {
            src: '/team/team-image.jpg',
            alt: 'Your trainer, Jovani Morales',
        },
        name: 'Jovani Morales',
        certifications: 'NASM CPT, CES, PES Certified massage therapist'
    })

    const about = ref<About>({
        title: 'Hello, I\'m Jovani. Welcome to my site!',
        content: [
            'I\'m a certified Personal Trainer and Certified Sports Massage Therapist.',
            'Helping people move well is my passion. Not only will I encourage you to be the best you can be, but I will also show you just how capable you are and help you stay out of pain, so you can continue with the activities you LOVE to do!',
            'I started my health journey as a Chiropractic Assistant in California over 14 years ago. The experience showed me the benefits of corrective bodywork, rehabilitation, and exercises, igniting my passion for training and helping people. This path of improvement continues; with those with who I have been blessed to work and with myself.',
            'Through these many years of experience, I have developed a training style that includes a mix of weightlifting, cardio, and core work – all designed to target an entire fitness profile that will be custom designed based on your unique needs. No "cookie-cutter" approach here',
            'I look forward to answering any questions you may have. Feel free to browse the many services available and contact me through this website to get started.'
        ],
        profile: profile.value
    })

    return {
        about,
        profile
    }
}
