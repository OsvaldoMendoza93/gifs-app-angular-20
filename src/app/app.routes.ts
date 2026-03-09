import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./gifs/pages/dashboard/dashboard.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
