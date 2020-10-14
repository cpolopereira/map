import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v11';
  zoom = environment.mapbox.zoom;

  constructor(
    private http: HttpClient
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  getAddress(address: string) {
    if (!!address) {
      return this.http.get(`${environment.addressSource}/${address}.json`, {
        params: {
          limit: environment.mapbox.addressesLimit,
          country: environment.mapbox.country,
          access_token: environment.mapbox.accessToken
        }
      });
    }
    return of([]);
  }

  getPoligon() {
    return this.http.get(environment.poligonSource);
  }

  buildMap(lat: number, lng: number, features: any) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lng, lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
    this.map.on('load', () => {
      this.map.addSource('maine', {
        'type': 'geojson',
        'data': features
      });
      this.map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'paint': {
          'fill-color': [
            "case", // Begin case expression
            ["<=", ["to-number", ["get", environment.property]], 1.4], "rgba(0, 221, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 2.9], "rgba(76, 227, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 4.3], "rgba(155, 232, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 5.7], "rgba(238, 238, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 7.1], "rgba(244, 162, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 8.6], "rgba(249, 83, 0, 0.5)",
            ["<=", ["to-number", ["get", environment.property]], 10], "rgba(255, 0, 0, 0.5)",
            "rgba(0,0,0,0)",
          ]
        }
      });
    });
  }

  changeMarker(coordinates: number[]) {
    this.marker.setLngLat(coordinates);
    this.map.flyTo({
      center: coordinates
    });
  }
}


