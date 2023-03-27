import { Injectable, Inject, Optional, Injector } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService, DEFAULT_LOGIN } from '@upupa/auth';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';


@Injectable({ providedIn: 'root' })
export class PermissionsGuard implements CanActivate, CanActivateChild {

    constructor(public router: Router, public authService: AuthService,
        private injector: Injector, public permissionService: PermissionsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.authService.user;
        if (!user) return this.reject(user);
        let url = window.location.pathname
        let permission = this.permissionService.checkPermission(url, 'admin')
        return permission.then(res => {
            if (res) {
                return res
            } else {
                return this.reject(user)
            }
        })
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    reject(user): boolean {
        if (user) {
            const forbiddenUrl = '/en/admin/forbidden'
            this.router.navigateByUrl(forbiddenUrl);
        } else {
            const signinUrl = this.injector.get(DEFAULT_LOGIN, '/')
            const returnTo = window.location.pathname
            this.router.navigateByUrl(signinUrl ? `${signinUrl}?redirect=${returnTo}` : '');
        }
        return false;
    }
}
