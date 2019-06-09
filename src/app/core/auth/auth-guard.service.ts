import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public authService: AuthService, public router: Router) {}
  canActivate() {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.router.navigate(['auth']);
    return false;
  }
}
