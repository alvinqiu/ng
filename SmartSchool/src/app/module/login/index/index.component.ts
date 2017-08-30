import { Component, OnInit } from '@angular/core';
import { LoginClass } from "../public/login-class";
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  model:LoginClass;
  constructor(
  	private _service: ApiService,
  	private router: Router,
    private _cookieService:CookieService,
    public snackBar: MdSnackBar
  	) { }

  ngOnInit() {
  	this.model = new LoginClass();
    if (this._cookieService.get("useraccount")) {
      this.model = JSON.parse(this._cookieService.get("useraccount"));
    }
    
  }

  save() {
    if (this.model.rememberMe) {
      this._cookieService.putObject("useraccount", this.model)
    } else {
      this._cookieService.remove("useraccount")
    }
  	this._service.postBasicHttp(`/login`, this.model, res => {
  		this.router.navigate(['app/homepage']);
  	}, error => {
      this.snackBar.open("用户名和密码不匹配，请重新输入！","",{
        duration: 1000
      });
    })
  }

}
