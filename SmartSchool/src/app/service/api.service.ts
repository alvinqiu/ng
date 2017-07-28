import { Injectable } from '@angular/core';
import { Http,Headers  } from '@angular/http';
import { environment } from '../../environments/environment';

const headers:Headers = new Headers({'Content-Type': 'application/json'});
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
  	// console.log(environment.production)
  	return this._http.get(domain+url).toPromise();
  }

  postHttp(url?:string, postData?:object) {
  	console.log("postData")
  	return this._http.post(domain+url,postData,{headers: headers}).toPromise()
  }
  
}
