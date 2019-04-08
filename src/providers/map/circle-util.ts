import { Injectable } from "@angular/core";
import { Circle, ILatLng, Spherical } from "@ionic-native/google-maps";

@Injectable()
export class CircleUtil {
    constructor(public spherical: Spherical) {
        console.log('Criado CircleUtil');
    }

    insideCircle(circle: Circle, latLng: ILatLng) {
        if (circle.getBounds().contains(latLng) && this.spherical.computeDistanceBetween(circle.getCenter(), latLng) <= circle.getRadius())
            return true;
        else
            return false;
    }
}