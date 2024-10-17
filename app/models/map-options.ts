export interface GoogleMapsApiLoaderOptions {
    apiKey: string;
    version: string,
    libraries?: string[];
}

export interface AdvancedMarkerOptions {
    position: Center;
    title:    string;
}

export interface MarkerOptions {
    position: Center;
    anchorPoint: string;
    label: string;
    title: string;
}

export interface MapOptions {
    zoom:             number;
    center:           Center;
    mapTypeId:        string;
    disableDefaultUI: boolean;
    scrollwheel:      boolean;
    styles:           Style[];
}

export interface Center {
    lat: number;
    lng: number;
}

export interface Style {
    featureType:  string;
    stylers:      Styler[];
    elementType?: string;
}

export interface Styler {
    saturation?: number;
    lightness?:  number;
    visibility?: string;
    hue?:        string;
}

