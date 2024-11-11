import { ref } from 'vue'

import type { Jumbotron } from '~/models/jumbotron'

export const useJumbotronData = () => {
    const jumbotron = ref<Jumbotron>({
        title: 'Ocho Fitness',
        description: 'Welcome to the family',
        ctas: [
            {
                title: "Get started now",
                to: "/#get-started",
                external: true,
                icon: null,
                displayText: "Get started",
                className: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            },
            {
                title: "Learn more about us",
                to: "/#about-us",
                external: true,
                icon: null,
                displayText: "Learn more",
                className: "hover:text-gray-900 border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            }
        ],
    })


    return {
        jumbotron
    }
}
