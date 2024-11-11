export interface Profile {
    img: {
        src: string;
        alt: string;
    },
    name: string;
    certifications: string;
}

export interface About {
    title: string;
    content: string[];
    profile: Profile;
}
