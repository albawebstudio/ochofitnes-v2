import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nContent } from '~/composables/useI18nContent'
import type { About, Profile } from "~/models/about"
import { withBase } from 'ufo'

export const useAboutData = () => {
    const { t } = useI18n()
    // Use the composable correctly
    const { getI18nArray } = useI18nContent()
    const { app } = useRuntimeConfig()

    const profile = computed<Profile>(() => ({
        img: {
            src: withBase('/team/team-image.jpg', app.baseURL),
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
