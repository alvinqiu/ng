import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config/menu';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  menu = Menu[1];
  constructor() { }

  ngOnInit() {
  }

}
