import { ref, computed } from 'vue'
import type {
    Site,
} from '~/models/site'
import type {
    Address,
    Email,
    Link,
    Phone,
    SocialLink,
} from '~/models/common/'
import { useI18n } from "vue-i18n";

export function useSiteData() {
    const { t } = useI18n()
    const localePath = useLocalePath() // Add this to make links locale-aware

    const addresses = ref<Address[]> ([
        {
            label: "work",
            address1: "794 Wilfred Road",
            address2: null,
            city: "Hudson",
            state: "WI",
            postal_code: "54016",
        },
        {
            label: "legal",
            address1: "794 Wilfred Road",
            address2: null,
            city: "Hudson",
            state: "WI",
            postal_code: "54016",
        }
    ])
    const emails = ref<Email[]> ([
        {
            display_name: "Business",
            account: "jovani",
            domain: "ochofitness.com"
        },
        {
            display_name: "Privacy",
            account: "privacy",
            domain: "ochofitness.com"
        }
    ])
    const phone = ref<Phone> ({
        raw: "+17157056361",
        formatted: "(715) 705-6361"
    })

    // Make navigation links locale-aware and ensure they navigate to homepage with hash
    const navigation = computed<Link[]> (() => [
        {
            title: t('navigation.home'),
            to: localePath('/#home'),
            external: true,
            icon: null,
            displayText: t('navigation.home'),
            className: null
        },
        {
            title: t('navigation.aboutUs'),
            to: localePath('/#about-us'),
            external: true,
            icon: null,
            displayText: t('navigation.aboutUs'),
            className: null
        },
        {
            title: t('navigation.services'),
            to: localePath('/#services'),
            external: true,
            icon: null,
            displayText: t('navigation.services'),
            className: null
        },
        {
            title: t('navigation.testimonials'),
            to: localePath('/#testimonials'),
            external: true,
            icon: null,
            displayText: t('navigation.testimonials'),
            className: null
        },
        {
            title: t('navigation.contactUs'),
            to: localePath('/#contact-us'),
            external: true,
            icon: null,
            displayText: t('navigation.contactUs'),
            className: null
        }
    ])

    const social_links = ref<SocialLink[]> ([
        {
            label: "facebook",
            name: "Facebook",
            display_title: "jovani.morales.142",
            icon: "fa-brands fa-facebook",
            href: "https://www.facebook.com/jovani.morales.142"
        },
        {
            label: "whatsapp",
            name: "WhatsApp",
            display_title: "wa.link/dwngg9",
            icon: "fa-brands fa-whatsapp",
            href: "https://wa.link/dwngg9"
        }
    ])

    // Update useful_links to also use localePath for consistency
    const useful_links = computed<Link[]>(() => [
        {
            title: t('site.usefulLinks.aboutUs.title'),
            to: localePath('/#about-us'),
            external: true,
            icon: null,
            displayText: t('site.usefulLinks.aboutUs.displayText'),
            className: null
        },
        {
            title: t('site.usefulLinks.newsletter.title'),
            to: localePath('/newsletter'),
            external: true,
            icon: null,
            displayText: t('site.usefulLinks.newsletter.displayText'),
            className: null
        },
    ])

    const resources = ref<Link[]>([
        {
            title: t('site.resources.newsletter.title'),
            to: "/newsletter",
            external: false,
            icon: null,
            displayText: t('site.resources.newsletter.displayText'),
            className: null
        },
        {
            title: t('site.resources.mayo.title'),
            to: "https://www.mayoclinic.org/healthy-lifestyle/fitness/resources/hlv-20049447?p=1",
            external: true,
            icon: null,
            displayText: t('site.resources.mayo.displayText'),
            className: null
        },
        {
            title: t('site.resources.exercises.title'),
            to: "https://www.heart.org/en/health-topics/cardiac-rehab/getting-physically-active/stretching-and-flexibility-exercises",
            external: true,
            icon: null,
            displayText: t('site.resources.exercises.displayText'),
            className: null
        }
    ]);

    // Make legal links locale-aware using computed
    const legal = computed<Link[]>(() => [
        {
            title: t('site.legal.terms.title'),
            to: localePath('/legal/terms-and-conditions'), // ← Now locale-aware!
            external: false,
            icon: null,
            displayText: t('site.legal.terms.displayText'),
            className: null
        },
        {
            title: t('site.legal.privacy.title'),
            to: localePath('/legal/privacy-policy'), // ← Now locale-aware!
            external: false,
            icon: null,
            displayText: t('site.legal.privacy.displayText'),
            className: null
        }
    ]);

    const site = computed<Site>(() => ({
        title: t('site.title'),
        legalName: t('site.legalName'),
        tagLine: t('site.tagLine'),
        url: t('site.url'),
        addresses: addresses.value,
        email: emails.value,
        phone: phone.value,
        navigation: navigation.value,
        social_title: t('site.social_title'),
        social_links: social_links.value,
        useful_links: useful_links.value,
        resources_title: t('site.resources_title'),
        resources: resources.value,
        legal_title: t('site.legal_title'),
        legal: legal.value, // Now uses the computed legal links
    }))

    const getSiteTitle = () => {
        return site.value.title;
    }
    const getAddressByLabel = (label: string) => computed(() => {
        return addresses.value.find(address => address.label === label) || null;
    });
    const getEmailByAccount = (account: string) => computed(() => {
        return emails.value.find(email => email.account === account) || null;
    });

    const getSocialLinkByLabel = (label: string) => computed(() => {
        return social_links.value.find(link => link.label === label) || null;
    })

    return {
        site,
        addresses,
        emails,
        phone,
        navigation,
        social_links,
        useful_links,
        resources,
        legal,
        getSiteTitle,
        getAddressByLabel,
        getEmailByAccount,
        getSocialLinkByLabel,
    }
}
