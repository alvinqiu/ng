import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config/menu';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  menu = Menu[1]
  constructor() { }

  ngOnInit() {
  }

}
