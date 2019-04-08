import { ILatLng } from "@ionic-native/google-maps";

export interface CircleOptions {
    center: ILatLng;
    radius: number;
    clickable?: boolean;
    borderColor?: string;
    fillColor?: string;
}
