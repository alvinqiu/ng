import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  getMenuObject(e:any):any {
  	console.log(e)
  	return e;
  }

}
