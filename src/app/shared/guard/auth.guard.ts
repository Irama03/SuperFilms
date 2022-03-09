import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.userData || this.authService.isLoggedIn || this.authService.allowNavigating) {
      console.log("Don't navigate to sign-in");
    }
    else {
      this.router.navigate(['sign-in']);
      console.log("Navigate in router to sign-in");
    }
    return true;
  }
}
