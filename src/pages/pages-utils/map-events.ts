import { GoogleMapsEvent, ILatLng } from '@ionic-native/google-maps';
import { MapProvider } from '../../providers/map/map';


export class MapEvents {

  constructor(private _map: MapProvider) {

  }

  onMapClick(eventMap: (value: ILatLng[]) => void) {
    this._map.getMapInstance().on(GoogleMapsEvent.MAP_CLICK).subscribe(eventMap);
    return this;
  }
}
