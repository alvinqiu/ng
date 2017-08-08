import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import * as qs from 'qs';

const headers:Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

let domain:string = "";

if (environment.production) {
	domain = "http://www.marchezvousblue.cn/ss";
} else {
	domain = "";
}


@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  getHttp(url?:string): Promise<any> {
  	return this._http.get(domain+url).toPromise();
  }

  postHttp(url?:string, postData?:any) {
    let param = qs.stringify(postData,{ 
                        serializeDate: function (d) { 
                          return d.toString()
                        }
                      })
  	return this._http
                .post(domain+url,
                      param,
                      {headers: headers})
                .toPromise()
  }

  postDelHttp(url?:string, postData?:any) {
    return this._http.post(domain+url,postData,{headers: headers}).toPromise()
  }

  getBasicHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(domain+url)
               .toPromise()
               .then(res => {
                 callback && callback(res.json());
               })
               .catch(e => {
                 console.error(e)
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
               })
  }
  
  getResourceHttp(url?:string, callback?:any ): Promise<any> {
    return this._http.get(domain+url).toPromise().then(response => {
      callback && callback(response.json())
    }).catch((e:any) => {
        console.log(e)
        document.getElementById('app-loading').style.display = "none";
    });
  }

  postResourceHttp(url?:string, param?:any,  callback?:any ): Promise<any> {
    return this._http
      .post(domain+url, param)
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
      .delete(domain+url, param)
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
