import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _service: ApiService,
    private router: Router
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	this._service.getBasicHttp("/user/profile", res => {
    })
    if (state.url === "/app/login") {
      document.getElementById("app-nav").style.display="none";
    } else {
      document.getElementById("app-nav").style.display="flex";
    }
  	
    
    return true;
  }
}
