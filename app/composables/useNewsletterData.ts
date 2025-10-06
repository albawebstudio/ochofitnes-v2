import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Newsletter } from '~/models/newsletter'


export const useNewsletterData = () => {
    const { t } = useI18n()

    const newsletter = computed<Newsletter>(() => ({
        title: t('newsletter.title'),
        cta: t('newsletter.cta'),
    }))

    return {
        newsletter,
    }
}
