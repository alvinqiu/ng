import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { MdDialog } from '@angular/material';
import { IPageChangeEvent } from '@covalent/core';
import { UploadModalComponent } from '../public/upload-modal/upload-modal.component';
import { fileTypeList } from '../../../config/menu';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  showMenu = {
  	period:[],
  	subject:[],
  	version:[],
  	textbook:[]
  }
  tree = [];
  nodesTree = [];
  searchMenu = {
    period:0,
    subject:0,
    version:0,
    textbook:0
  };
  sumSize = {
    "sumSize":0,
    "count":0
  };
  keyword = "name";
  keywordlist = [{"text":"名称", "value":"name"},{"text":"作者", "value":"authorName"},{"text":"时间", "value":"createTime"}];
  serarchSectionId = 0;
  resourcelist = [];
  searchInputTerm: string = "";
  firstLast: boolean = false;
  initialPage: number = 1;
  fileTypes = [];
  formatValue = "";
  event: IPageChangeEvent;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  sort = "";
  constructor(
  	private _service: ApiService,
    public dialog: MdDialog,
    private router: Router
  	) { }

  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp('/resource/sumSize', res => {
      this.sumSize = res;
    });
  	this._service.getResourceHttp('/category/tree', res => {
	    this.fileTypes = fileTypeList;
	  	this.showMenu.period = this.tree = res;
	    this.searchMenu.period = this.showMenu.period.length>0?this.showMenu.period[0].id:0;
	  	this.showMenu.subject = this.showMenu.period.length>0?this.showMenu.period[0].children:[];
	    this.searchMenu.subject = this.showMenu.subject.length>0?this.showMenu.subject[0].id:0;
	  	this.showMenu.version = this.showMenu.subject.length>0?this.showMenu.subject[0].children:[];
	    this.searchMenu.version = this.showMenu.version.length>0?this.showMenu.version[0].id:0;
	    this.showMenu.textbook = this.showMenu.version.length>0?this.showMenu.version[0].children:[];
	    this.searchMenu.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
      this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
        this.nodesTree = res
      })
      this.searchResource();
  	})
    
  }

  periodChange(): void {
    this.showMenu.period.map( item => {
      if (item.id == this.searchMenu.period) {
        this.showMenu.subject = item.children;
        this.searchMenu.subject = this.showMenu.subject.length > 0?this.showMenu.subject[0].id: 0;
        this.showMenu.version = this.showMenu.subject.length>0?this.showMenu.subject[0].children:[];
        this.searchMenu.version = this.showMenu.version.length>0?this.showMenu.version[0].id:0;
        this.showMenu.textbook = this.showMenu.version.length>0?this.showMenu.version[0].children:[];
        this.searchMenu.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
        this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
          this.nodesTree = res
        })
        this.serarchSectionId = 0;
        this.searchResource();
      }
    })
  }

  subjectChange(): void {
    this.showMenu.subject.map( item => {
      if (item.id == this.searchMenu.subject) {
        this.showMenu.version = item.children;
        this.searchMenu.version = this.showMenu.version.length>0?this.showMenu.version[0].id:0;
        this.showMenu.textbook = this.showMenu.version.length>0?this.showMenu.version[0].children:[];
        this.searchMenu.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
        this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
          this.nodesTree = res
        })
        this.serarchSectionId = 0;
        this.searchResource();
      }
    })
  }

  versionChange(): void {
    this.showMenu.version.map( item => {
      this.showMenu.textbook = item.children;
      this.searchMenu.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
      this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
        this.nodesTree = res
      })
      this.serarchSectionId = 0;
      this.searchResource();
    })
  }

  textbookChange(): void {
    this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
      this.nodesTree = res
    })
    this.serarchSectionId = 0;
    this.searchResource();
  }

  chapterSearch(e: number) {
    this.serarchSectionId = e;
    this.searchResource()

  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.searchResource();
  }

  handleSearch(searchInputTerm: string):void {
     this.router.navigate([`/app/resource/search/${searchInputTerm?searchInputTerm:''}`]);
  }

  download(e) {
    location.href = `/resource/${e}/download`;
  }
  searchResource() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?${this.keyword}=${this.keyword == "createTime"?Date.parse(this.searchInputTerm):this.searchInputTerm}&stagesId=${this.searchMenu.period == 0?'':this.searchMenu.period}&courseId=${this.searchMenu.subject == 0?'':this.searchMenu.subject}&versionId=${this.searchMenu.version == 0?'':this.searchMenu.version}&gradeId=${this.searchMenu.textbook == 0?'':this.searchMenu.textbook}&sectionId=${this.serarchSectionId == 0?"":this.serarchSectionId}&format=${this.formatValue}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    })
  }
  ascending() {
    this.sort = "asc";
    this.searchResource()
  }
  descending() {
    this.sort = "des";
    this.searchResource()
  }
  openDialog(condition: any): void {
    condition.tree = this.tree;
    condition.fileTypes = this.fileTypes;
    let dialogRef = this.dialog.open(UploadModalComponent, {
      data: condition,
      width: "60%"
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if (this.page == 1) {
        this.searchResource();
      }
      
    });
  }
  formatChange() {
    this.searchResource()
  }
  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
  }
  iconfont(e) {
    switch(e) {
      case "WORD":
        return "iconfont icon-word"
      case "PPT":
        return "iconfont icon-PPT"
      case "PDF":
        return "iconfont icon-pdf"
      case "TEXT":
        return "iconfont icon-txt"
      case "IMAGE":
        return "iconfont icon-image"
      case "VIDEO":
        return "iconfont icon-vedio"
      case "VOICE":
        return "iconfont icon-voice"
      default:
        return "iconfont icon-file"

    }
  }
  bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
      let k = 1024;
      let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let i = Math.floor(Math.log(bytes) / Math.log(k));
      var num = bytes / Math.pow(k, i);
      return num.toPrecision(3) + ' ' + sizes[i];
      //return (bytes / Math.pow(k, i)) + ' ' + sizes[i]; 
      //toPrecision(3) 后面保留一位小数，如1.0GB //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
}
