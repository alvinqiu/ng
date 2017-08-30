import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { UploadModalComponent } from '../public/upload-modal/upload-modal.component';
import { fileTypeList } from '../../../config/menu';
import { MsgComponent } from '../public/msg/msg.component'; 
@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  resourcelist:any = [];
  userData = {};
  tree = [];
  fileTypes = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalElements: number = 0;
  searchInputTerm: string = "";
  searchReview: string = "";
  searchStatus: string = "";
  showMenu = {
    period:[],
    subject:[],
    version:[],
    textbook:[]
  };
  searchMenu = {
    period:0,
    subject:0,
    version:0,
    textbook:0
  };
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
  formatValue = "";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
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
        
        this.searchResource();
      }
    })
  }

  versionChange(): void {
    this.showMenu.version.map( item => {
      this.showMenu.textbook = item.children;
      this.searchMenu.textbook = this.showMenu.textbook.length>0?this.showMenu.textbook[0].id:0;
      
      this.searchResource();
    })
  }

  textbookChange(): void {
    this.searchResource();
  }
  cancelFavorite(id) {
    this._service.postResourceHttp(`/resource/${id}/favorite`, {"favorite":false}, res => {
      let dialogRef = this.dialog.open(MsgComponent, {
        data:{"label":"取消收藏成功","msg":"", "color":"primary","icon":"success"},
        width:"60%"
      });
      this.searchResource();
      // dialogRef.afterClosed().subscribe(result => {
      
      //   if (this.page == 1) {
      //     this.searchResource();
      //   }
        
      // });
    })


  }
  filterStatus(v) {
    switch(v){
      case 'REJECT':
        return '审核失败';
      case 'PUBLISH':
        return '审核通过'
      default:
        return "待审核"
    }
  }
  delete(id):void {
    this._service.deleteResourceHttp(`/resource/${id}`, {}, (res) => {
      let dialogRef = this.dialog.open(MsgComponent, {
        data:{"label":"删除成功","msg":"", "color":"primary","icon":"success"},
        width:"60%"
      });
      this.searchResource();
    })
  }
  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.searchResource();
  }

  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.searchResource()
  }
  searchResource() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource/me?keyword=${this.searchInputTerm}&stagesId=${this.searchMenu.period}&courseId=${this.searchMenu.subject}&versionId=${this.searchMenu.version}&gradeId=${this.searchMenu.textbook}&format=${this.formatValue}&page=${this.page}&size=${this.pageSize}`, res => {
      this.resourcelist = res.content;
      this.totalElements = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
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
}
