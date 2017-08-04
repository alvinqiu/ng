import { Component, Input, OnChanges, OnInit, DoCheck, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnChanges, OnInit, DoCheck, OnDestroy {

  constructor() { }
  
  ngOnInit() {
  }

  ngOnChanges(changes) {
	console.log('ngOnChanges');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

	ngOnDestroy() {

	    console.log('ngOnDestroy');

	}
}
