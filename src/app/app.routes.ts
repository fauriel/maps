import { Routes } from '@angular/router';
import { FullscreeenMapComponent } from './pages/fullscreeen-map/fullscreeen-map.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [

  { path: 'fullscreen',
    component: FullscreeenMapComponent,
    title: 'FullScreen Map'
  },
  { path: 'markers',
    component: MarkersPageComponent,
    title: 'Marcadores'
  },
  { path: 'houses',
    component: HousesPageComponent,
    title: 'Propiedades en Map'
  },
  { path: '**',
    redirectTo: 'fullscreen',

  },
];
