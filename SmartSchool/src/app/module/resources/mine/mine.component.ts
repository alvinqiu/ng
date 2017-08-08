import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { UploadmodalComponent } from '../public/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  list:any = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalElements: number;
  searchInputTerm: string = "";
  searchReview: string = "";
  searchStatus: string = "";
  reviewStatus = [{
    value: 'UNAIDED', viewValue: '待审核'
  },{
    value: 'PUBLISH', viewValue: '审核通过'
  },{
    value: 'REJECT', viewValue: '审核失败'
  }];
  resourceStatus = [{
    value: 1, viewValue: '公开资源'
  },{
    value: 2, viewValue: '收藏资源'
  }];
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp('/resource/me?page=1&pageSize=20', res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource/me?page=${this.page}&pageSize=${this.pageSize}&sourceType=${this.searchStatus}&status=${this.searchReview}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  openDialog():void {
    let dialogRef = this.dialog.open(UploadmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  radioChange() {
    setTimeout(() => {
      this._service.getResourceHttp(`/resource/me?page=${this.page}&pageSize=${this.pageSize}&sourceType=${this.searchStatus}&status=${this.searchReview}`, res => {
        this.list = res.content;
        this.totalElements = res.totalElements;
        document.getElementById('app-loading').style.display = "none";
      })
    }, 0);
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service.getResourceHttp(`/resource/me?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  delete(id: number) {
    this._service.deleteResourceHttp(`/resource/batch`,`{ids:[${id}]}`,res => {

    })
  }
  cancelFavorite(id: number) {
    this._service.postResourceHttp(`/resource/${id}/favorite`, {"favorite":false},res => {

    })
  }
  download(id: number) {
    this._service.getResourceHttp(`/resource/${id}/download`)
  }
}
