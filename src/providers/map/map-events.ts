import { GoogleMap, GoogleMapsEvent, ILatLng } from "@ionic-native/google-maps";
import { MapProvider } from "./map";

export class MapEvents {

    constructor(private _map: MapProvider) {

    }

    onMapClick(eventMap: (value: ILatLng[]) => void) {

        this._map.closeTooltip();

        this._map.getMapInstance().on(GoogleMapsEvent.MAP_CLICK).subscribe(eventMap);

        return this;
    }
}