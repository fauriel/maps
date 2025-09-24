import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { environments } from '../../../environments/environment';
import { v4 as UUIDV4 } from'uuid'
import { JsonPipe } from '@angular/common';


mapboxgl.accessToken = environments.mapboxKey;
interface Marker {
  id: string,
  mapboxMarker: mapboxgl.Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [ JsonPipe],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([])

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
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

   /* const marker = new mapboxgl.Marker({
      draggable: true
     const color = '#xxxxxx'.replace(/x/g, (y) =>
  ((Math.random() * 16) | 0).toString(16)
);

    })
    .setLngLat([-98.1983963875387,  19.04281015])
    .addTo(map)

    marker.on('dragend', (event) => {
      console.log(event)
    })*/
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => {
      this.mapClick(event)
    })
    this.map.set(map)
  }
mapClick(event: mapboxgl.MapMouseEvent){
  if(!this.map()) return;
  const map = this.map()!;

   const color = '#xxxxxx'.replace(/x/g, (y) =>
     ((Math.random() * 16) | 0).toString(16)
   );
   const coords =(event.lngLat)

   const markerMarket = new mapboxgl.Marker({
     draggable: true,
     color: color
   })
   .setLngLat(coords)
    .addTo(map)
    const newMArket: Marker ={
      id: UUIDV4(),
      mapboxMarker: markerMarket
    }

    this.markers.set([newMArket, ...this.markers()])
    console.log(this.markers)
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map()) return

    this.map()?.flyTo({
      center: lngLat
    })
  }
  deleteMarker(marker: Marker){
    if(!this.map()) return
    const map = this.map()!;
    marker.mapboxMarker.remove()
    this.markers.set( this.markers().filter((m) => m.id != marker.id))
  }

}
