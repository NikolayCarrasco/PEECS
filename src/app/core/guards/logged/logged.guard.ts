import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
    
  constructor(
    private router: Router,
    private authservice: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authservice.isLogged()){
      if(this.authservice.entity() === 'Admin'){
        this.router.navigate(['/admin'])
      }
      if(this.authservice.entity() === 'User'){
        this.router.navigate(['/user'])
      } 
    }  
    return true;
  }
  
}
