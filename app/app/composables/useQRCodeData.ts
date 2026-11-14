import { computed } from 'vue'
import { useI18nContent } from '~/composables/useI18nContent'
import { useI18n } from "vue-i18n";

export interface QRCode {
    content: string[];
    contents: string;
    title: string;
    moduleColor: string;
    positionRingColor: string;
    positionCenterColor: string;
    logoSvg: string;
}

export const useQRCodeData = () => {
    const { getI18nArray } = useI18nContent()
    const { t } = useI18n()

    const qrCodes = computed<QRCode[]>(() => [
        {
            content: getI18nArray('qrCode.whatsApp.content'),
            contents: "https://wa.me/qr/ZDQNX3FAJV3AC1",
            title: t('qrCode.whatsApp.title'),
            moduleColor: "#25D366",
            positionRingColor: "#075E54",
            positionCenterColor: "#25D366",
            logoSvg: "SvgoWhatsapp",
        },
        {
            content: getI18nArray('qrCode.venmo.content'),
            contents: "https://www.venmo.com/u/Jovani-Morales-1",
            title: t('qrCode.venmo.title'),
            moduleColor: "#008CFF",
            positionRingColor: "#ffffff",
            positionCenterColor: "#008CFF",
            logoSvg: "SvgoVenmo",
        }
    ])

    return {
        qrCodes
    }

}
