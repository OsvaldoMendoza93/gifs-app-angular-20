import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then(m => m.Dashboard),
    children: [
      {
        path: 'treding',
        loadComponent: () => import('../treding/treding').then(m => m.Treding)
      },
      {
        path: 'search',
        loadComponent: () => import('../search/search').then(m => m.Search)
      },
      {
        path: '',
        redirectTo: 'treding',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
