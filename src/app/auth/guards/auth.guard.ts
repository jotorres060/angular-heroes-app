import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.checkAuth()
      .pipe(
        tap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login']);
          }
        })
      )
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuth()
      .pipe(
        tap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login']);
          }
        })
      )
  }
}
