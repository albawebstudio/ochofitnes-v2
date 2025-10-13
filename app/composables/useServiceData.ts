import { computed } from 'vue'

import type { Service } from '~/models/service'
import type { ServiceItem } from '~/models/service-item'
import { useI18nContent } from "~/composables/useI18nContent"

export function useServiceData() {
    const { t } = useI18n()
    const { getI18nArray } = useI18nContent()

    const service_items = computed<ServiceItem[]>(() => [
        {
            title: t('services.sportsMassage.title'),
            content: getI18nArray('services.sportsMassage.content'),
            img: {
                src: "/class/sports-massage.jpg",
                alt: t('services.sportsMassage.imageAlt')
            },
            price: {
                amount: 60.00,
                currency: t('services.unitOfMeasure.currency'),
                unit: {
                    preposition: t('services.unitOfMeasure.preposition'),
                    measure: t('services.unitOfMeasure.minute'),
                    quantity: 30
                },
                formattedValue: t('services.sportsMassage.price'),
            },
            list: getI18nArray('services.sportsMassage.list')
        },
        {
            title: t('services.smallGroup.title'),
            content: getI18nArray('services.smallGroup.content'),
            img: {
                src: "/class/small-group-class.jpg",
                alt: t('services.smallGroup.imageAlt')
            },
            price: {
                amount: 50.00,
                currency: t('services.unitOfMeasure.currency'),
                unit: {
                    preposition: t('services.unitOfMeasure.preposition'),
                    measure: t('services.unitOfMeasure.minute'),
                    quantity: 60
                },
                formattedValue: t('services.smallGroup.price'),
            },
            list: getI18nArray('services.smallGroup.list')
        },
        {
            title: t('services.individualTraining.title'),
            content: getI18nArray('services.individualTraining.content'),
            img: {
                src: "/class/sports-specific-class.jpg",
                alt: t('services.individualTraining.imageAlt')
            },
            price: {
                amount: 60.00,
                currency: t('services.unitOfMeasure.currency'),
                unit: {
                    preposition: t('services.unitOfMeasure.preposition'),
                    measure: t('services.unitOfMeasure.minute'),
                    quantity: 30
                },
                formattedValue: t('services.individualTraining.price'),
            },
            list: getI18nArray('services.individualTraining.list')
        },
        {
            title: t('services.onlineTraining.title'),
            content: getI18nArray('services.onlineTraining.content'),
            img: {
                src: "/class/online-training.jpg",
                alt: t('services.onlineTraining.imageAlt')
            },
            price: {
                amount: 55.00,
                currency: t('services.unitOfMeasure.currency'),
                unit: {
                    preposition: t('services.unitOfMeasure.preposition'),
                    measure: t('services.unitOfMeasure.minute'),
                    quantity: 30
                },
                formattedValue: t('services.onlineTraining.price'),
            },
            list: getI18nArray('services.onlineTraining.list')
        }
    ])

    const service = computed<Service>(() => ({
        title: t('services.title'),
        content: getI18nArray('services.content'),
        items: service_items.value
    }))

    return {
        service
    }
}


