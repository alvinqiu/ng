import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { UploadmodalComponent } from '../public/uploadmodal/uploadmodal.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  list:any = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalElements: number;
  searchInputTerm: string = "";
  typelist = [];
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) {
    // this.pageSize = 50;

  }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp('/resource?page=1&size=20', res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
    this._service.getResourceHttp('/resource/type', res => {
      this.typelist = res;

    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  
  openDialog(condition:any):void {
    condition.typelist = this.typelist;
    let dialogRef = this.dialog.open(UploadmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
