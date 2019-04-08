import { ElementRef, Injectable } from '@angular/core';
import {
    CameraPosition,
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    GoogleMapsMapTypeId,
    HtmlInfoWindow,
    ILatLng,
    Marker,
    MyLocation,
    MyLocationOptions,
} from '@ionic-native/google-maps';

import { CircleEvents } from './circle-events';
import { CircleOptions } from './circle-options';
import { MapEvents } from './map-events';
import { MapOptions } from './map-options';
import { PolygonEvents } from './polygon-events';
import { PolygonOptions } from './polygon-options';

@Injectable()
export class MapProvider {

    private _map: GoogleMap;
    private mapElement: ElementRef;
    private _events: MapEvents;
    private _infoWindow: HtmlInfoWindow;

    constructor() {
    }

    getMapInstance() {
        return this._map;
    }

    init(mapElement: ElementRef): MapProvider {
        this.mapElement = mapElement;

        return this;
    }

    create(mapOptions?: MapOptions): MapEvents {

        if (this._map)
            this._map.remove();

        let options: GoogleMapOptions = this.getDefaultMapOptions();

        if (mapOptions) {
            if (mapOptions.disable) {
                options.gestures = { rotate: false, zoom: false, scroll: false, tilt: false };
                options.controls = { compass: false, myLocationButton: false, myLocation: false };
            }
        }

        this._map = GoogleMaps.create(this.mapElement.nativeElement, options);

        if (mapOptions && mapOptions.callbackCreate)
            mapOptions.callbackCreate.apply(this, [this._map]);

        if (mapOptions && mapOptions.currentPosition) {
            this.getMapMyLocation().then((currentPosition: ILatLng) => {
                this.moveCamera({ target: [currentPosition] });
            });
        }

        this._events = new MapEvents(this);

        return this._events;
    }

    async getMapMyLocation() {
        let currentPosition = await this._map.getMyLocation()
            .then((myLocation: MyLocation) => {
                return myLocation.latLng;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
        return currentPosition;
    }

    getDefaultMapOptions(): GoogleMapOptions {
        return {
            mapType: GoogleMapsMapTypeId.HYBRID,
            camera: {
                zoom: 16
            }, controls: {
                compass: true,
                myLocation: true,
                myLocationButton: false
            },
            gestures: {
                rotate: true
            }
        };
    }


    addPolygon(polygonPoints: ILatLng[], _polygonOptions?: PolygonOptions): PolygonEvents {

        let hasConfig = false;
        if (_polygonOptions != undefined) hasConfig = true

        let polygon = this._map.addPolygonSync({
            points: polygonPoints,
            strokeColor: hasConfig ? _polygonOptions.borderColor || '#ffffff' : '#ffffff',
            fillColor: hasConfig ? _polygonOptions.fillColor || 'rgba(102, 170, 170, 0.5)' : 'rgba(102, 170, 170, 0.5)',
            strokeWidth: 3,
            clickable: hasConfig ? _polygonOptions.clickable : false
        });

        let event = new PolygonEvents(polygon, this);

        return event;
    }

    addMarker(centerPolygon: ILatLng): Marker {
        return this._map.addMarkerSync({
            icon: { url: './assets/imgs/marker-new.png' },
            visible: false,
            position: centerPolygon,
            infoWindowAnchor: [33, 87]
        });
    }

    addCircle(circleOptions: CircleOptions): CircleEvents {

        let circle = this._map.addCircleSync({
            center: circleOptions.center,
            radius: circleOptions.radius,
            strokeColor: circleOptions.borderColor ? circleOptions.borderColor : '#ffffff',
            fillColor: circleOptions.fillColor ? circleOptions.fillColor : 'rgba(102, 170, 170, 0.5)',
            strokeWidth: 3,
            clickable: circleOptions.clickable ? circleOptions.clickable : false
        });

        let event = new CircleEvents(circle, this);

        return event;
    }


    moveCamera(cameraPosition: CameraPosition<any>) {
        this._map.moveCamera(cameraPosition);
    }

    animateCamera(centerPolygon: ILatLng) {
        this._map.animateCamera({ 'target': centerPolygon, duration: 500 })
    }

    getMyLocation(options?: MyLocationOptions) {
        return this._map.getMyLocation({ enableHighAccuracy: true });
    }

    closeTooltip() {
        if (this._infoWindow) {
            this._infoWindow.close();
            this._infoWindow = null;
        }
    }

    destroyMap() {
        this._map.remove();
    }

    clearMap() {
        this._map.clear();
    }

    onCloseTooltip(event: Function) {
        this.closeTooltip();

        event.apply;
    }

    openTooltip(contents: string, position: ILatLng) {

        let markerInfo = this.addMarker(position);

        this.animateCamera(position);

        this._infoWindow = new HtmlInfoWindow();
        this._infoWindow.setBackgroundColor('#ddd');
        this._infoWindow.setContent(contents);

        this._infoWindow.open(markerInfo);
    }
}
