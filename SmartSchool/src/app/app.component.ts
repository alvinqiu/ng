import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from './service/api.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  	title = 'app works!';
  	constructor(
  		private _service:ApiService,
  		private router: Router
  		) {

  	}
	ngAfterViewInit(): void {
		document.getElementById('app-loading').style.display = "none";
	}
	logout() {
		this._service.getBasicHttp(`/logout`, res => {
			this.router.navigate(['/app/login']);
		});
	}
}
