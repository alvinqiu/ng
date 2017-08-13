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
  gradelist = [];
  subjectlist = [];
  searchTypeId:string = "";
  searchStagesId:string = "";
  searchCourseId:string = "";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) {
    // this.pageSize = 50;

  }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp('/resource?page=1&pageSize=20', res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
    this._service.getResourceHttp('/resource/type', res => {
      this.typelist = res;

    })
    this._service.getResourceHttp('/api/bi/grade/getGradeByCondition', res => {
      this.gradelist = res.entries;

    })
    this._service.getResourceHttp('/api/bi/subject/getSubjectByCondition', res => {
      this.subjectlist = res.entries;

    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&name=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  radioChange() {
    setTimeout(() => {
      this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}`, res => {
        this.list = res.content;
        this.totalElements = res.totalElements;
        document.getElementById('app-loading').style.display = "none";
      })
    }, 0);
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&name=${this.searchInputTerm}`, res => {
      this.list = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  
  openDialog(condition:any):void {
    condition.typelist = this.typelist;
    condition.gradelist = this.gradelist;
    condition.subjectlist = this.subjectlist;
    let dialogRef = this.dialog.open(UploadmodalComponent, {
      data: condition,
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status == "refresh") {
        this._service.getResourceHttp(`/resource?page=${this.page}&pageSize=${this.pageSize}&typeId=${this.searchTypeId}&stagesId=${this.searchStagesId}&courseId=${this.searchCourseId}&name=${this.searchInputTerm}`, res => {
          this.list = res.content;
          this.totalElements = res.totalElements;
          document.getElementById('app-loading').style.display = "none";
        })
      }
    });
  }

}
