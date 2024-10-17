import { ref } from 'vue'

import type { GetStarted } from '~/models/get-started'

export function useGetStartedData() {
    const getStarted = ref<GetStarted>({
        title: "New to working out?",
        content: [
            "Whether you are new to exercise or have been exercising for some time, I can help!"
        ],
        cta: "Schedule A Session Today",
        subtitle: "How can I help you?",
        list: [
            "Workouts that meet your needs and level of fitness.",
            "Increase strength",
            "Build muscle",
            "Improve flexibility",
        ]
    })

    return {
        getStarted
    }
}
