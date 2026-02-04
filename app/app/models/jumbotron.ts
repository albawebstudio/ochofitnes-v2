import type { Link } from '~/models/common'

export interface Jumbotron {
    title: string;
    description: string;
    ctas: Link[];
}
