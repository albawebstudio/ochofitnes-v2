import type { ServiceItem } from "~/app/models/service-item";

export interface Service {
    title: string;
    content: string[];
    items: ServiceItem[];
}
