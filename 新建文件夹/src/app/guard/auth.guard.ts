import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
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
      document.getElementById("app-nav").style.display="none";
      document.getElementById("app-nav-list").style.display="none";
    }
    
    return true;
  }
}
