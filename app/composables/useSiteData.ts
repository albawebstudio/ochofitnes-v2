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


export function useSiteData() {
    const addresses = ref<Address[]> ([
        {
            label: "office",
            address1: "",
            address2: null,
            city: "Apple Valley",
            state: "MN",
            zip: "55124",
        },
        {
            label: "legal",
            address1: "202 N Cedar Ave",
            address2: "Suite #1",
            city: "Owatonna",
            state: "MN",
            zip: "55060",
        }
    ])
    const emails = ref<Email[]> ([
        {
            display_name: "Support",
            account: "subppport",
            domain: "albaweb.studio"
        },
        {
            display_name: "Privacy",
            account: "privacy",
            domain: "albaweb.studio"
        }
    ])
    const phone = ref<Phone> ({
        raw: "+16124406349",
        formatted: "(612) 440-6349"
    })
    const navigation = ref<Link[]> ([
        {
            title: "Home",
            to: "/#home",
            external: true,
            icon: null,
            displayText: "Home"
        },
        {
            title: "About Us",
            to: "/#about-us",
            external: true,
            icon: null,
            displayText: "About Us"
        },
        {
            title: "Portfolio",
            to: "/#portfolio",
            external: false,
            icon: null,
            displayText: "Portfolio"
        },
        {
            title: "Contact Us",
            to: "/#contact-us",
            external: false,
            icon: null,
            displayText: "Contact Us"
        }
    ])
    const social_links = ref<SocialLink[]> ([
        {
            label: "linkedin",
            name: "LinkedIn",
            display_title: "company/alba-web-studio",
            icon: "fab fa-linkedin",
            href: "https://www.linkedin.com/company/alba-web-studio/"
        },
        {
            label: "instagram",
            name: "Instagram",
            display_title: "instagram.com/albawebstudio",
            icon: "fab fa-instagram",
            href: "https://instagram.com/albawebstudio/"
        },
        {
            label: "github",
            name: "Github",
            display_title: "github.com/albawebstudio",
            icon: "fab fa-github",
            href: "https://github.com/albawebstudio"
        }
    ])
    const useful_links = ref<Link[]>([
        {
            title: "More about us",
            to: "/#about-us",
            external: true,
            icon: null,
            displayText: "About Us"
        },
        {
            title: "Check out our blog",
            to: "/blog",
            external: false,
            icon: null,
            displayText: "Blog"
        },
        {
            title: "Our Github Repos",
            to: "https://github.com/albawebstudio",
            external: false,
            icon: null,
            displayText: "Github"
        }
    ]);
    const other_resources = ref<Link[]>([
        {
            title: "Check out our license",
            to: "https://github.com/albawebstudio/albaweb.studio/blob/main/LICENSE.md?ref=aws-profile",
            external: true,
            icon: null,
            displayText: "MIT License"
        },
        {
            title: "Check out our terms and conditions",
            to: "/terms",
            external: false,
            icon: null,
            displayText: "Terms & Conditions"
        },
        {
            title: "View our privacy policy",
            to: "/privacy",
            external: false,
            icon: null,
            displayText: "Privacy Policy"
        },
        {
            title: "Contact Us",
            to: "/#contact-us",
            external: false,
            icon: null,
            displayText: "Contact Us"
        }
    ]);
    const site = ref<Site>({
        title: "Alba Web Studio",
        legalName: "Alba Web Studio LLC",
        tagLine: "",
        url: "https://www.albaweb.studio",
        addresses: addresses.value,
        email: emails.value,
        phone: phone.value,
        navigation: navigation.value,
        social_links: social_links.value,
        useful_links: useful_links.value,
        other_resources: other_resources.value,
    })

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
        other_resources,
        getSiteTitle,
        getAddressByLabel,
        getEmailByAccount,
        getSocialLinkByLabel,
    }
}
