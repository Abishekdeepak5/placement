import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'home',loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) ,children: [
        {
          path: 'login', 
          loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), 
        },
        {
          path: 'register',
          loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) ,
        },
      ],},
    {path:'sidebar',loadComponent: () => import('./components/sidebar/sidebar.component').then(m => m.SidebarComponent) },
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    {path:'verify/:email',loadComponent: () => import('./pages/otp/otp.component').then(m => m.OtpComponent) },
    {path:'company/create',loadComponent: () => import('./pages/company/create-company/create-company.component').then(m => m.CreateCompanyComponent) },
    {path:'drive/:companyId/create',loadComponent: () => import('./pages/drive/create-drive/create-drive.component').then(m => m.CreateDriveComponent) },
    {path:'student/marks',loadComponent: () => import('./pages/student/mark/mark.component').then(m => m.MarkComponent) },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**',   redirectTo: '/home' },  //404 not found

];
