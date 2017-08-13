import { Component, OnInit } from '@angular/core';
import { LoginClass } from "../public/login-class";
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  model:LoginClass
  constructor(
  	private _service: ApiService,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.model = new LoginClass();
  }

  save() {
  	this._service.postBasicHttp(`/login`, this.model, res => {
  		this.router.navigate(['/app/homepage']);
  	})
  }

}
