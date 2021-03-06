import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as qs from 'qs';

const headers:Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

let domain:string = "";
let domainAssets:string = "";
let domainResource: string = ""; 

if (environment.production) {
	// domain = "http://www.marchezvousblue.cn/auth";
 //  domainAssets = "http://www.marchezvousblue.cn/auth";
 //  domainResource = "http://dev.slothtek.com:8081/";
  // domain = "http://www.marchezvousblue.cn";
  // domainAssets = "http://www.marchezvousblue.cn";
  // domainResource = "http://www.marchezvousblue.cn";
}



@Injectable()
export class ApiService {

  constructor(private _http: Http, private router: Router) { }

  
  getBasicHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(domain+url)
               .toPromise()
               .then(res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                 callback && callback(res.json());
               })
               .catch(e => {
                 document.getElementById('app-loading').style.display = "none";
               });
  }

  postBasicHttp(url?:string, postData?:any, callback?:any, error?:any) {
    let param = qs.stringify(postData,{
                        serializeDate: function (d) {
                          return d.toString()
                        }
                      })
    return this._http
               .post(domain+url, param, {headers: headers})
               .toPromise()
               .then( res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                  callback && callback(res.json())
               })
               .catch( e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
                 error && error(e)
               })

  }

  postBasicDelHttp(url?:string, postData?:any, callback?:any) {
    return this._http
               .post(domain+url,postData,{headers: headers})
               .toPromise()
               .then( res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                 callback && callback(res.json())
               })
               .catch(e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })
  }

  putBasicHttp(url?:string, postData?:any, callback?:any, error?:any) {
     console.log(postData)
     return this._http
                .put(domain+url, postData, {headers: headers})
                .toPromise()
                .then( res => {
                  if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                  callback && callback(res.json())
                })
                .catch( e => {
                  // console.error(e)
                  error && error()
                  document.getElementById('app-loading').style.display = "none";
                })
  }
  getAssetsHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(domain+url)
               .toPromise()
               .then(res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                 callback && callback(res.json());
               })
               .catch(e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               });
  }

  postAssetsHttp(url?:string, postData?:any, callback?:any) {
    let param = qs.stringify(postData,{
                        serializeDate: function (d) {
                          return d.toString()
                        }
                      })
    return this._http
               .post(domain+url, param, {headers: headers})
               .toPromise()
               .then( res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                  callback && callback(res.json())
               })
               .catch( e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })

  }

  postAssetsDelHttp(url?:string, callback?:any) {
    return this._http
              .delete(domain+url)
               .toPromise()
               .then( res => {
                 if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
                 callback && callback(res.json())
               })
               .catch(e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })
  }

  getResourceHttp(url?:string, callback?:any ): Promise<any> {
    return this._http.get(domainResource+url).toPromise().then(res => {
      if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
      callback && callback(res.json())
    }).catch((e:any) => {
        document.getElementById('app-loading').style.display = "none";
    });
  }

  postResourceHttp(url?:string, param?:any,  callback?:any ): Promise<any> {
    return this._http
      .post(domainResource+url, param)
      .toPromise()
      .then(res => {
        if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
        callback && callback(res.json())
      })
      .catch((e:any) => {
        document.getElementById('app-loading').style.display = "none";
      });
  }

  deleteResourceHttp(url?:string, param?:any, callback?:any) {
    return this._http
      .delete(domainResource+url, param)
      .toPromise()
      .then(res => {
        if (res.json().isLogin && res.json().isLogin == "false") {
                   this.router.navigate(['/app/login']);
                   return
                 }
        callback && callback(res.json())
      })
      .catch((e:any) => {
        document.getElementById('app-loading').style.display = "none";
      });
  }
}
