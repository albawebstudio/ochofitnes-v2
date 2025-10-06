import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nContent } from "~/composables/useI18nContent"
import type { About, Profile } from '~/models/about'

export const useAboutData = () => {
    const { t } = useI18n()
    // Use the composable correctly
    const { getI18nArray } = useI18nContent()

    const profile = computed<Profile>(() => ({
        img: {
            src: '/team/team-image.jpg',
            alt: t('about.profile.imageAlt'),
        },
        name: t('about.profile.name'),
        certifications: t('about.profile.certifications')
    }))

    const about = computed<About>(() => {
        return {
            title: t('about.title'),
            content: getI18nArray('about.content'),
            profile: profile.value,
        }
    })

    return {
        about,
        profile
    }
}
