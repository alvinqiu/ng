import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config/menu';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  menu = Menu[0]
  constructor() {}

  ngOnInit() {}

}
