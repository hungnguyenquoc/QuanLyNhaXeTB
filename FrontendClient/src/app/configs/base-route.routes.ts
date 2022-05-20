import { Routes } from '@angular/router';

export const BASE_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../layouts/main-layout/main-layout.module').then((m) => m.MainLayoutModule)
  },

  {
    path: 'Not-Found',
    redirectTo: '/'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
