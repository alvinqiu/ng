import { Component, OnInit } from '@angular/core';
import { ClassesmodalComponent } from '../public/classesmodal/classesmodal.component';
import { 
  ITdDataTableColumn,
  IPageChangeEvent
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { ClassClass } from '../public/classesmodal/class-class';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  basicData: ClassClass[];
  columns: ITdDataTableColumn[] = [
    { name: 'className', label: '班级名字' },
    { name: 'gradeId', label: '所属年级' },
    { name: 'classManager', label: '班级负责人' },
    { name: 'studentNum', label: '学生人数' },
    { name: 'classLocation', label: '班级位置' },
    { name: 'classDesc', label: '班级描述' },
  ];
  nodes = [];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string = "";
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchGrade:string = "";
  gradelist = [];
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { }

  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service
        .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
          this.basicData = response.entries;
          this.totalCount = response.totalCount;
          document.getElementById('app-loading').style.display = "none";
        })
    this._service
        .getBasicHttp(`/api/bi/grade/getGradeAttr`, (response:any) => {
          this.nodes = response;
        })
    this._service
        .getBasicHttp(`/api/bi/grade/getGradeByCondition`, (response:any) => {
          this.gradelist = response.entries;
        })
        
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    condition.gradelist = this.gradelist;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(ClassesmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              
            })
            
        }
      });
    }
    
  }
  selectEvent(e:any):any {
    console.log(e)
    console.log(this.selectedRows)
  }
  delete():void {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要删除的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      
      let reqlist = this.selectedRows.map( item => item.id);
      let del = `gradeIds=${reqlist.join('&gradeIds=')}`

      this._service
        .postBasicDelHttp(`/api/bi/class/delClass`, del, (response:any) => {
          this._service
            .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              this.selectedRows = [];
            })
            
        })
        
    }
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }

  searchByGrade(e): void {
    if (e.indexOf("g_") > -1) {
      this.searchGrade = e.split("g_")[1];
      this.page = 1;
      this._service
      .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
    } else {
      this.searchGrade = "";
      this.page = 1;
      this._service
      .getBasicHttp(`/api/bi/class/getClassByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}&gradeId=${this.searchGrade}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
    }
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }
}
