import type {
    Address,
    Phone,
    Email,
    Link,
    SocialLink,
} from "~/models/common";

export interface Site {
    title: string;
    legalName: string;
    tagLine: string;
    url: string;
    addresses: Address[];
    phone: Phone;
    email: Email[];
    navigation: Link[];
    social_title: string;
    social_links: SocialLink[];
    useful_links: Link[];
    resources_title: string;
    resources: Link[];
    legal_title: string;
    legal: Link[];
}
