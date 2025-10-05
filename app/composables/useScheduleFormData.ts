import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nObject } from '~/composables/useI18nContent'

import type { ScheduleField, ScheduleLabels } from "~/models/schedule";

export function useScheduleData() {
    const { t } = useI18n()

    // Get the structured schedule object from i18n
    const scheduleLabels = useI18nObject<ScheduleLabels>('forms.schedule')

    // Session type options - these should also be in i18n
    const sessionTypeOptions = computed(() => {
        // Check if translations are available before using them
        const hasTranslations = t('forms.schedule.session_types.sports_massage') !== 'forms.schedule.session_types.sports_massage'

        return [
            {
                value: 'sports massage',
                label: hasTranslations ? t('forms.schedule.session_types.sports_massage') : 'Sports Massage'
            },
            {
                value: 'individual training',
                label: hasTranslations ? t('forms.schedule.session_types.individual_training') : 'Individual Training'
            },
            {
                value: 'online training',
                label: hasTranslations ? t('forms.schedule.session_types.online_training') : 'Online Training'
            },
            {
                value: 'group training',
                label: hasTranslations ? t('forms.schedule.session_types.group_training') : 'Group Training'
            }
        ]
    })

    // Day options - these should also be in i18n
    const dayOptions = computed(() => {
        const hasTranslations = t('forms.schedule.days.sunday') !== 'forms.schedule.days.sunday'

        return [
            { value: 'Sunday', label: hasTranslations ? t('forms.schedule.days.sunday') : 'Sunday' },
            { value: 'Monday', label: hasTranslations ? t('forms.schedule.days.monday') : 'Monday' },
            { value: 'Tuesday', label: hasTranslations ? t('forms.schedule.days.tuesday') : 'Tuesday' },
            { value: 'Wednesday', label: hasTranslations ? t('forms.schedule.days.wednesday') : 'Wednesday' },
            { value: 'Thursday', label: hasTranslations ? t('forms.schedule.days.thursday') : 'Thursday' },
            { value: 'Friday', label: hasTranslations ? t('forms.schedule.days.friday') : 'Friday' },
            { value: 'Saturday', label: hasTranslations ? t('forms.schedule.days.saturday') : 'Saturday' }
        ]
    })

    return {
        scheduleLabels,
        sessionTypeOptions,
        dayOptions
    }
}
