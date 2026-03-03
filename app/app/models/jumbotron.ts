import type { Link } from '~/app/models/common'

export interface Jumbotron {
    title: string;
    description: string;
    ctas: Link[];
}
