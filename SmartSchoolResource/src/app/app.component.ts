import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    ngAfterViewInit(): void {
		document.getElementById('app-loading').style.display = "none";
	}
	logout() {
		
	}
}
