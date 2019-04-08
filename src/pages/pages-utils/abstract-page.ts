import { ElementRef } from '@angular/core';
import { GoogleMap } from '@ionic-native/google-maps';
import { MapProvider } from '../../providers/map/map';

export abstract class AbstractPage {
  private _map: GoogleMap;
  private _mapElement: ElementRef;

  constructor(private _mapProvider: MapProvider) {}

  setMapElement(mapElement: ElementRef) {
    this._mapElement = mapElement;
  }

  async initMap() {
    if (this._map)
      this._map.remove();

	await this._mapProvider
		.init(this._mapElement)
		.create()
		.onMapClick((event) => {
			this._mapProvider.addCircle({
				center: event[0],
				radius: 1000
			});
		});
  }

}
