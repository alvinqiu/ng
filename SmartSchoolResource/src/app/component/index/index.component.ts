import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config/menu';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  	Menu.map( item => {

  	})
  }

}
