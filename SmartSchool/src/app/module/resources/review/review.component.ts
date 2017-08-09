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
  typelist = [];
  gradelist = [];
  subjectlist = [];
  searchTypeId:string ="";
  searchStagesId:string ="";
  searchCourseId:string ="";
  searchAsset: string ="";
  reviewStatus = [{
    value: 'UNAIDED', viewValue: '待审核'
  },{
    value: 'PUBLISH', viewValue: '审核通过'
  },{
    value: 'REJECT', viewValue: '审核失败'
  }];
  status = "UNAIDED";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource/audit?page=1&pageSize=20`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
    this._service.getResourceHttp('/resource/type', res => {
      console.log(res)
      this.typelist = res;

    })
    this._service.getResourceHttp('/api/bi/grade/getGradeByCondition', res => {
      console.log(res)
      this.gradelist = res.entries;

    })
    this._service.getResourceHttp('/api/bi/subject/getSubjectByCondition', res => {
      console.log(res)
      this.subjectlist = res.entries;

    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource/audit?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&status=${this.searchAsset}&name=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  radioChange() {
    setTimeout(() => {
      this._service.getResourceHttp(`/resource/audit?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&status=${this.searchAsset}&name=${this.searchInputTerm}`, res => {
        this.list = res.content;
        this.totalElements = res.totalElements;
        document.getElementById('app-loading').style.display = "none";
      })
    }, 0);
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service.getResourceHttp(`/resource/audit?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&status=${this.searchAsset}&name=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  openDialog():void {
    
  }

}
