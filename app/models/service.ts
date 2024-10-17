import type { ServiceItem } from "~/models/service-item";

export interface Service {
    title: string;
    content: string[];
    items: ServiceItem[];
}
