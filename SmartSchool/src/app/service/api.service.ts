import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import * as qs from 'qs';

const headers:Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

let domain:string = "";

// if (environment.production) {
// 	domain = "http://dev.slothtek.com:8080";
// } else {
// 	domain = "";
// }


@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  getHttp(url?:string): Promise<any> {
  	return this._http.get(domain+url).toPromise();
  }

  postHttp(url?:string, postData?:any) {
    console.log(qs.stringify(postData))
  	return this._http.post(domain+url,qs.stringify(postData),{headers: headers}).toPromise()
  }

  postDelHttp(url?:string, postData?:any) {
    return this._http.post(domain+url,postData,{headers: headers}).toPromise()
  }
  // postHttp2(url?:string, postData?:any) {
  //   console.log(qs.stringify(postData))
  //   return this._http.post(domain+url,`gradeName=444444&schoolName=`,{headers: headers}).toPromise()
  // }

  deleteHttp(url?:string, deleteData?:any) {
  	return this._http.delete(domain+url, {headers: headers, body: deleteData}).toPromise()
  }
  
}
