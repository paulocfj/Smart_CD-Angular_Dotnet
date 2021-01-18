import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidatorsHelper } from '../helpers/validator';

@Injectable({
  providedIn: 'root'
})
export class GerenicAcessGuard implements CanActivate {

  token: string;

  constructor(private router: Router, private validator: ValidatorsHelper) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = localStorage.getItem('token');
    if(this.token && this.validator.isValid(this.token)){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}
