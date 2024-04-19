import { Routes } from '@angular/router';
import { authGuard } from './CORE/Auth/guard/auth.guard';
import { dashGuard } from './CORE/Auth/guard/dash.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./MOD/Access/login/login.component'),
    canActivate: [authGuard],
  },
  {
    path: 'sale',
    title: 'Sale',
    loadComponent: () => import('./MOD/Dashboard/Dashboard.component'),
    canActivate: [dashGuard],
  },
];
