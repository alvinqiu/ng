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
    console.log(qs.stringify(postData), { serializeDate: function (d) {return encodeURIComponent(d)}})
    let param = qs.stringify(postData,{ 
                        serializeDate: function (d) { 
                          return d.toString()
                          // return encodeURIComponent()
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
  // postHttp2(url?:string, postData?:any) {
  //   return this._http.post(domain+url,"gradeName=2222222&schoolName=&managerName=222222&gradeDesc=222222222&gradeLevel=Wed%2520Aug%252002%25202017%252015%253A38%253A17%2520GMT%252B0800%2520(%25E4%25B8%25AD%25E5%259B%25BD%25E6%25A0%2587%25E5%2587%2586%25E6%2597%25B6%25E9%2597%25B4)&gradeAttr=0&status=0",{headers: headers}).toPromise()
  // }

  deleteHttp(url?:string, deleteData?:any) {
  	return this._http.delete(domain+url, {headers: headers, body: deleteData}).toPromise()
  }
  
}
