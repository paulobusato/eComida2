import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../cliente.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProdutoAtivoGuard implements CanActivate {

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.clienteService.produtoAtivado) {
        return true;
      }

      this.location.back();
      return false;
  }

}
