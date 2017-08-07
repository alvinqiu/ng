import { Component, OnInit } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	JsBarcode("#barcode", "12346789", {
		  width:4,
		  height:40	
	});
  }

}
