export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n

    // mapping between i18n codes and full lang codes
    const localeMap: Record<string, string> = {
        en: 'en-US',
        es: 'es-MX'
    }

    const setLang = (loc: string) => {
        document.documentElement.setAttribute('lang', localeMap[loc] || loc)
    }

    // set immediately on load
    setLang(i18n.locale.value)

    // watch for changes
    watch(i18n.locale, (newLocale) => {
        setLang(newLocale)
    })
})
