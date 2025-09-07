export interface Contact {
    title: string
    content: string[]
}

export interface Labels {
    email: string
    socials: string
}

export interface ContactField {
    label: string
    placeholder: string | null
}

export interface ContactFormLabels {
    name: ContactField
    email: ContactField
    subject: ContactField
    message: ContactField
    submit: string
}
