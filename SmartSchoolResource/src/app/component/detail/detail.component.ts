import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
