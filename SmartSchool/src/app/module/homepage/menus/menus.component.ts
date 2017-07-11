import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../config/menu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  Menu = Menu
  constructor() { }

  ngOnInit() {
  }

}
