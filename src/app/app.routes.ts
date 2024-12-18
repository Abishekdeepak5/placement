import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },

];
