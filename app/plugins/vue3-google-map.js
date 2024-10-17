import { GoogleMap, AdvancedMarker, Marker, CustomMarker, InfoWindow } from "vue3-google-map";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('GoogleMap', GoogleMap)
    nuxtApp.vueApp.component('AdvancedMarker', AdvancedMarker)
    nuxtApp.vueApp.component('Marker', Marker)
    nuxtApp.vueApp.component('CustomMarker', CustomMarker)
    nuxtApp.vueApp.component('InfoWindow', InfoWindow)

    return {
        provide: {
            GoogleMap,
            AdvancedMarker,
            Marker,
            CustomMarker,
            InfoWindow,
        },
    }
})
