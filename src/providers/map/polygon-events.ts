import { GoogleMapsEvent, Polygon, ILatLng } from "@ionic-native/google-maps";
import { MapProvider } from "./map";

export class PolygonEvents {

    constructor(private _polygon: Polygon, private _map: MapProvider) {

    }

    onPolygonClick(eventPolygon: (points: ILatLng[], polygon: Polygon) => void, contents?: string) {
        return this;
	}
	
	getPolygon() {
		return this._polygon;
	}
}