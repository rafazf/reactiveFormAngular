import { Routes } from '@angular/router';
import { authGuard } from './CORE/Auth/guard/auth.guard';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'full'
    },
    {
        path:'login',title:'Login',loadComponent:()=>import('./MOD/Access/login/login.component')
    },
    {
        path:'dashboard',
        title:'Dashboard',
        loadComponent:()=>import('./MOD/Dashboard/Dashboard.component'),
        canActivate:[authGuard],
    }
];
