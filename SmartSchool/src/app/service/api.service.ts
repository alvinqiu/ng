import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import * as qs from 'qs';

const headers:Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

let domain:string = "";
let domainAssets:string = "";
let domainResource: string = ""; 

if (environment.production) {
	domain = "http://www.marchezvousblue.cn/ss";
  domainAssets = "http://www.marchezvousblue.cn/assets";
  domainResource = "http://dev.slothtek.com:8081/";
}



@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  
  getBasicHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(domain+url)
               .toPromise()
               .then(res => {
                 callback && callback(res.json());
               })
               .catch(e => {
                 console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               });
  }

  postBasicHttp(url?:string, postData?:any, callback?:any) {
    let param = qs.stringify(postData,{
                        serializeDate: function (d) {
                          return d.toString()
                        }
                      })
    return this._http
               .post(domain+url, param, {headers: headers})
               .toPromise()
               .then( res => {
                  callback && callback(res.json())
               })
               .catch( e => {
                 console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })

  }

  postBasicDelHttp(url?:string, postData?:any, callback?:any) {
    return this._http
               .post(domain+url,postData,{headers: headers})
               .toPromise()
               .then( res => {
                 callback && callback(res.json())
               })
               .catch(e => {
                 console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })
  }

  getAssetsHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(domain+url)
               .toPromise()
               .then(res => {
                 callback && callback(res.json());
               })
               .catch(e => {
                 console.error(e)
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
                  callback && callback(res.json())
               })
               .catch( e => {
                 console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })

  }

  postAssetsDelHttp(url?:string, callback?:any) {
    return this._http
              .delete(domain+url)
               .toPromise()
               .then( res => {
                 callback && callback(res.json())
               })
               .catch(e => {
                 console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })
  }

  getResourceHttp(url?:string, callback?:any ): Promise<any> {
    return this._http.get(domainResource+url).toPromise().then(response => {
      callback && callback(response.json())
    }).catch((e:any) => {
        console.log(e)
        document.getElementById('app-loading').style.display = "none";
    });
  }

  postResourceHttp(url?:string, param?:any,  callback?:any ): Promise<any> {
    return this._http
      .post(domainResource+url, param)
      .toPromise()
      .then(response => {
        callback && callback(response.json())
      })
      .catch((e:any) => {
        console.log(e)
        document.getElementById('app-loading').style.display = "none";
      });
  }

  deleteResourceHttp(url?:string, param?:any, callback?:any) {
    return this._http
      .delete(domainResource+url, param)
      .toPromise()
      .then(response => {
        callback && callback(response.json())
      })
      .catch((e:any) => {
        console.log(e)
        document.getElementById('app-loading').style.display = "none";
      });
  }
}
