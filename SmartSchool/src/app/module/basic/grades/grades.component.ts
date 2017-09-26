import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { ApiService } from '../../../service/api.service';
import { GradesmodalComponent } from '../public/gradesmodal/gradesmodal.component';
import { GradeClass } from '../public/gradesmodal/grade-class';
// import { GradeInterface } from '../../../interface/grade';
// import { GradeClass } from '../../..／class/grade';
import { Http,Headers  } from '@angular/http';

 

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],

})
export class GradesComponent implements OnInit {
  basicData: Array<GradeClass>;
  columns: ITdDataTableColumn[] = [
    { name: 'gradeName', label: '年级名字' },
    { name: 'gradeAttr', label: '年级属性' ,
      format: v =>  {
        switch(v){
          case 0 :
            return "学前教育";
            // break;
          case 1 :
            return "小学";
            // break;
          case 2 :
            return "初中";
            // break;
          case 3 :
            return "高中";
            // break;
          case 4 :
            return "高等教育";
            // break;
          default:
            return ""
        }
          
      }
    },
    // { name: 'gradeLevel', label: '入学年', format: v => v? `${new Date(v).getFullYear()}级`:''},
    { name: 'managerName', label: '年级负责人' },
    { name: 'status', label: '状态' , format: v => v && v == 1 ? '结业':'在读'},
    { name: 'schoolName', label: '学校' },
    { name: 'gradeDesc', label: '描述' },
    
  ];
  stafflist = [];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  searchInputTerm: string = "";
  sortBy: string = 'gradeName';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
  	public dialog: MdDialog,
    private _service: ApiService
  ) { }

  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getBasicHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
            this.basicData = response.entries;
            this.totalCount = response.totalCount;
            document.getElementById('app-loading').style.display = "none";
          })
      this._service
        .getBasicHttp(`/api/bi/staff/getStaffByCondition`, (response:any) => {
          this.stafflist = response.entries;
        })
          
  }

  selectEvent(e:any):any {
    this.selectedRows = e;
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    condition.stafflist = this.stafflist;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(GradesmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getBasicHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}&gradeName=${this.searchInputTerm}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              
            })
            
        }
      });
    }
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getBasicHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}&gradeName=${searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      

  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/grade/getGradeByCondition?page=${event.page}&pageSize=${event.pageSize}&gradeName=${this.searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
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
        .postBasicDelHttp(`/api/bi/grade/delGrade`, del, (response:any) => {
          this._service
            .getBasicHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              this.selectedRows = [];
            })
            
        })
        
    }
  }
  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
  }
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
}
