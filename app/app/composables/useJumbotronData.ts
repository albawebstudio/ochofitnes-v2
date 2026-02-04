import { computed } from 'vue'
// Use type import for the type
import type { Jumbotron } from '~/models/jumbotron'

export const useJumbotronData = () => {
    const { t } = useI18n()
    const localePath = useLocalePath() // Add this to make links locale-aware

    const jumbotron = computed<Jumbotron>(() => ({
        title: t('jumbotron.title'),
        description: t('jumbotron.description'),
        ctas: [
            {
                title: "Get started now",
                to: localePath('/#get-started'),
                external: true,
                icon: null,
                displayText: t('jumbotron.getStarted'),
                className: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            },
            {
                title: "Learn more about us",
                to: localePath('/#about-us'),
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
