import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  
    { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
    {path:'verify/:email',loadComponent: () => import('./components/otp/otp.component').then(m => m.OtpComponent) }

];
