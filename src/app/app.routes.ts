import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then((m) => m.ServicesComponent) },
  { path: 'pept', loadComponent: () => import('./pages/pept/pept.component').then((m) => m.PeptComponent) },
  { path: 'souscription', loadComponent: () => import('./pages/subscribe/subscribe.component').then((m) => m.SubscribeComponent) },
  { path: 'suivi', loadComponent: () => import('./pages/track/track.component').then((m) => m.TrackComponent) },
  {
    path: 'agent/demandes',
    loadComponent: () =>
      import('./pages/agent/agent-dashboard.component').then((m) => m.AgentDashboardComponent),
  },
  { path: '**', redirectTo: '' },
];
