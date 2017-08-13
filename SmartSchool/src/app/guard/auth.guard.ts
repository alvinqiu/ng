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
  	console.log('AuthGuard#canActivate called')
  	// if (state.url === "/app/login") {
   //    document.getElementById("app-nav").style.display="none";
   //    document.getElementById("app-nav-list").style.display="none";
  	// } else if (state.url.indexOf("/app/basic") > -1) {
   //    document.getElementById("app-nav").style.display="flex";
   //    document.getElementById("app-nav-list").style.display="block";
   //  } else {
   //    document.getElementById("app-nav").style.display="none";
   //    document.getElementById("app-nav-list").style.display="none";
   //  }
    this._service.getBasicHttp("/user/profile", res => {
      // this.router.navigate(['/app/login']);
    })
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	console.log('AuthGuard#canChildActivate called')
  	if (state.url === "/app/login") {
      document.getElementById("app-nav").style.display="none";
      document.getElementById("app-nav-list").style.display="none";
    } else if (state.url.indexOf("/app/basic") > -1) {
      document.getElementById("app-nav").style.display="flex";
      document.getElementById("app-nav-list").style.display="none";
    } else if (state.url.indexOf("/app/homepage") > -1) {
      document.getElementById("app-nav").style.display="flex";
    }else {
      document.getElementById("app-nav").style.display="flex";
      document.getElementById("app-nav-list").style.display="none";
    }
    
    return true;
  }
}
