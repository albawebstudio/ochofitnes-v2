import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getI18nArray } from "~/composables/useI18nContent"

import type { GetStarted } from '~/models/get-started'

export function useGetStartedData() {
    const { t } = useI18n()

    const getStarted = ref<GetStarted>({
        title: t('started.title'),
        content: getI18nArray('started.content'),
        cta: t('started.cta'),
        ctaSuccess: t('started.ctaSuccess'),
        subtitle: t('started.subtitle'),
        list: getI18nArray('started.list'),
    })

    return {
        getStarted
    }
}
