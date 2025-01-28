import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ParamMap, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { CoreService } from './core.service';
import { AuthService } from './auth.service';
// import { Email } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    emailadd:string='';
    constructor(private coreService: CoreService, private router: Router,private authService:AuthService,private route:ActivatedRoute) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            res => {
                if (!this.coreService.isLoggedIn()) {
                    this.router.navigate(['/login']);
                }
                res(this.coreService.isLoggedIn());
        });
    }
}