import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nContent } from "~/composables/useI18nContent"

import type { Contact, Labels, ContactFormLabels } from '~/models/contact'

export function useContactData() {
    const { t } = useI18n()
    // Use the composable correctly
    const { getI18nArray, useI18nObject } = useI18nContent()

    const contact = computed<Contact>(() => ({
        title: t('contact.title'),
        content: getI18nArray('contact.content')
    }))

    const labels = ref<Labels>({
        email: t('contact.labels.email'),
        socials: t('contact.labels.socials')
    })

    // Get the form labels from i18n
    const formLabels = useI18nObject<ContactFormLabels>('forms.contact')

    return {
        contact,
        labels,
        formLabels
    }
}
