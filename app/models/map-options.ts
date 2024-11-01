export interface GoogleMapsApiLoaderOptions {
    apiKey: string;
    version: string,
    libraries?: string[];
}

export interface AdvancedMarkerOptions {
    position: Center;
    title:    string;
}

export interface CustomMarker  {
    position?: Center;
    map?: google.maps.Map | google.maps.StreetViewPanorama | null;
    anchorPoint?: "CENTER" | "TOP_CENTER" | "BOTTOM_CENTER" | "LEFT_CENTER" | "RIGHT_CENTER" | "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_RIGHT";
    offsetX?: number;
    offsetY?: number;
    zIndex?: number | null;
}

export interface MapOptions {
    zoom:             number;
    center:           Center;
    mapTypeId:        string;
    disableDefaultUI: boolean;
    scrollWheel:      boolean;
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

