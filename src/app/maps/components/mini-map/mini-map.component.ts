import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  lngLat = input.required<{lng: number, lat: number}>()
   zomm = input<number>(14);

  coordinates = signal({
    lng: -98.2063,
    lat: 19.0414,
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((res) => setTimeout(res, 80));
    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zomm(), // starting zoom
      interactive: false,
      pitch: 30
    });
    new mapboxgl.Marker().setLngLat( this.lngLat()).addTo(map)
  }
}
