import { computed } from 'vue'

import type { Jumbotron } from '~/models/jumbotron'

export const useJumbotronData = () => {
    const { t } = useI18n()
    
    const jumbotron = computed<Jumbotron>(() => ({
        title: t('jumbotron.title'),
        description: t('jumbotron.description'),
        ctas: [
            {
                title: "Get started now",
                to: "/#get-started",
                external: true,
                icon: null,
                displayText: t('jumbotron.getStarted'),
                className: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            },
            {
                title: "Learn more about us",
                to: "/#about-us",
                external: true,
                icon: null,
                displayText: t('jumbotron.learnMore'),
                className: "hover:text-gray-900 border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            }
        ],
    }))


    return {
        jumbotron
    }
}
