import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environments } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environments.mapboxKey;

@Component({
  selector: 'app-fullscreeen-map',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreeen-map.component.html',
  styleUrl: './fullscreeen-map.component.css',
})
export class FullscreeenMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  zomm = signal(14);
  coordinates = signal({
    lng: -98.2063,
    lat: 19.0414,
  });

  zoomEfect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zomm());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((res) => setTimeout(res, 60));
    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zomm(), // starting zoom
    });
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zomm.set(newZoom);
    });
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });
    map.on('load', () => {});
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
    this.map.set(map);
  }
}
