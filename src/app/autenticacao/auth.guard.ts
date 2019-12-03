import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token'));

    console.log(token);
    console.log(next);

    if (token && token.data.idCliente && next.url[0].path === 'cliente') {
      return true;
    } else if (token && token.data.idEstabelecimento && next.url[0].path === 'estabelecimento') {
      return true;
    } else if (next.url[0].path === 'cliente') {
      this.router.navigate(['/cliente/login']);
    } else if (next.url[0].path === 'estabelecimento') {
      this.router.navigate(['/estabelecimento']);
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
