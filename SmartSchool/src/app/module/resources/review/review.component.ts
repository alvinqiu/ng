import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  list:any = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalElements: number;
  searchInputTerm: string = "";
  status = "UNAIDED";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource/audit?page=1&size=20`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource/audit?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }

  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service.getResourceHttp(`/resource/audit?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  openDialog():void {
    
  }

}
