import { Component, OnInit } from '@angular/core';
import {
	Router,
	ActivatedRoute,
	Params
} from "@angular/router";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	
	pdfSrc: string = "https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf";
	page: number = 1;
	maxPage: number;
	minPage: number = 1;
  rate: number = 4;
  constructor(private aRoute: ActivatedRoute) {
  	this.aRoute.params.subscribe((params) => {
       console.log(params.id);
    });
  }

  ngOnInit() {
  }

}
