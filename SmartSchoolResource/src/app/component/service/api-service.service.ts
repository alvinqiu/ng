import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
const headers:Headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

@Injectable()
export class ApiServiceService {

  constructor(private _http: Http) { }
  getBasicHttp(url?:string, callback?:any): Promise<any> {
    return this._http
               .get(url)
               .toPromise()
               .then(res => {
                 callback && callback(res.json());
               })
               .catch(e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               });
  }

  postBasicHttp(url?:string, postData?:any, callback?:any) {
    // let param = qs.stringify(postData,{
    //                     serializeDate: function (d) {
    //                       return d.toString()
    //                     }
    //                   })
    return this._http
               .post(url, postData, {headers: headers})
               .toPromise()
               .then( res => {
                  callback && callback(res.json())
               })
               .catch( e => {
                 // console.error(e)
                 document.getElementById('app-loading').style.display = "none";
               })

  }
}
