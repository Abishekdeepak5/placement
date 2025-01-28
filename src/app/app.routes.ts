import { Routes } from '@angular/router';
import { AuthGuard } from './shared/service/auth-guard';

export const routes: Routes = [
    {path:'home',canActivate:[AuthGuard],loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) ,children: [
        {
          path: 'drives', 
          loadComponent: () => import('./pages/drive/drives/drives.component').then(m => m.DrivesComponent), 
        },
        {
          path: 'companies',
          loadComponent: () => import('./pages/company/companies/companies.component').then(m => m.CompaniesComponent), 
        },
        {
          path: 'marks',
          loadComponent: () => import('./pages/student/mark/mark.component').then(m => m.MarkComponent), 
        },
        {
          path: 'drive/:driveId', 
          loadComponent: () => import('./pages/drive/drive-detail/drive-detail.component').then(m => m.DriveDetailComponent), 
        },
        {
          path: 'company/:companyId/drives', 
          loadComponent: () => import('./pages/drive/drives/drives.component').then(m => m.DrivesComponent), 
        },
      ],},
    {path:'sidebar',canActivate:[AuthGuard],loadComponent: () => import('./components/sidebar/sidebar.component').then(m => m.SidebarComponent) },
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    {path:'verify/:email',loadComponent: () => import('./pages/otp/otp.component').then(m => m.OtpComponent) },
    {path:'company/create',canActivate:[AuthGuard],loadComponent: () => import('./pages/company/create-company/create-company.component').then(m => m.CreateCompanyComponent) },
    {path:'drive/:companyId/create',canActivate:[AuthGuard],loadComponent: () => import('./pages/drive/create-drive/create-drive.component').then(m => m.CreateDriveComponent) },
    {path:'drive/:driveId/edit',canActivate:[AuthGuard],loadComponent: () => import('./pages/drive/create-drive/create-drive.component').then(m => m.CreateDriveComponent) },
    {path:'student/marks',canActivate:[AuthGuard],loadComponent: () => import('./pages/student/mark/mark.component').then(m => m.MarkComponent) },
    { path: '',   redirectTo: '/home/drives', pathMatch: 'full' },
    { path: '**',   redirectTo: '/home/drives' },  //404 not found

];
