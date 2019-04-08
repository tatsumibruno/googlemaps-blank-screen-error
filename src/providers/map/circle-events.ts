import { Circle, GoogleMapsEvent, ILatLng } from "@ionic-native/google-maps";
import { MapProvider } from "./map";

export class CircleEvents {

    constructor(private _circle: Circle, private _map: MapProvider) {

    }

    onCircleClick(eventCircle: (point: ILatLng, circle: Circle) => void, contents?: string) {

        this._circle.on(GoogleMapsEvent.CIRCLE_CLICK).subscribe((param) => {
            this._map.closeTooltip();

            if (contents) {
                this._map.openTooltip(contents, param[1].getCenter());
            }

            eventCircle(param[0], param[1]);
        });

        return this;
    }

    getCircle() {
        return this._circle;
    }
}