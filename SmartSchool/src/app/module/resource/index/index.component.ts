import { Component, OnInit } from '@angular/core';
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
  }
  resourcelist = [];
  searchInputTerm: string = "";
  fileTypes = [];
  formatValue = "";
  event: IPageChangeEvent;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  constructor(
  	private _service: ApiService,
    public dialog: MdDialog
  	) { }

  ngOnInit() {
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
        this.page = 1;
        this.event.page = 1;
        console.log(this.event)
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
      this.searchResource();
    })
  }

  textbookChange(): void {
    this._service.getResourceHttp(`/category/sections?gradeId=${this.searchMenu.textbook}`, res => {
      this.nodesTree = res
    })
    this.searchResource();
  }

  change(event: IPageChangeEvent): void {
    console.log(event)
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.searchResource();
  }

  handleSearch(searchInputTerm: string):void {

  }

  search () {

  }
  
  searchResource() {
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&stagesId=${this.searchMenu.period}&courseId=${this.searchMenu.subject}&versionId=${this.searchMenu.version}&gradeId=${this.searchMenu.textbook}&format=${this.formatValue}&page=${this.page}&size=${this.pageSize}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      // this.page = res.page;
      // this.pageSize = res.size;
    })
  }
  openDialog(condition: any): void {
    condition.tree = this.tree;
    condition.fileTypes = this.fileTypes;
    let dialogRef = this.dialog.open(UploadModalComponent, {
      data: condition,
      width: "60%"
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  formatChange() {
    this.searchResource()
  }

}
