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
import { GradeInterface } from '../../../interface/grade';
import { GradeClass } from '../../../class/grade';
import { Http,Headers  } from '@angular/http';

 

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],

})
export class GradesComponent implements OnInit {
  basicData: Array<GradeInterface>;
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
    { name: 'gradeLevel', label: '入学年' },
    { name: 'managerName', label: '年级负责人' },
    { name: 'status', label: '状态' , format: v => v == 1 ? '结业':'在读'},
    { name: 'schoolName', label: '学校' },
    { name: 'gradeDesc', label: '描述' },
    
  ];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchInputTerm: string = "";
  sortBy: string = 'gradeName';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
  	public dialog: MdDialog,
    private _service: ApiService
  ) { }

  ngOnInit() {
      
      this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`)
          .then((response:any) => {
            this.basicData = response.json().entries;
            this.totalCount = response.json().totalCount;
          })
          .catch((e:any) => {console.log(e)});
      // this.page = 1;
      // this.pageSize = 20;

  }

  selectEvent(e:any):any {
  	// console.log(e)
  	// console.log(this.selectedRows)
  }

  openDialog(condition:any):void {
    condition.gradelist = this.basicData;
    condition.selectedRows = this.selectedRows;
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
        if (result.status == "refresh") {
          this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`)
          .then((response:any) => {
            this.basicData = response.json().entries;
            this.totalCount = response.json().totalCount;
          })
          .catch((e:any) => {console.log(e)});
        }
      });
    }
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}&gradeName=${searchInputTerm}`)
      .then((response:any) => {
        console.log(response)
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      })

  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getHttp(`/api/bi/grade/getGradeByCondition?page=${event.page}&pageSize=${event.pageSize}&gradeName=${this.searchInputTerm}`)
      .then((response:any) => {
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      });
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
        .postDelHttp(`/api/bi/grade/delGrade`, del)
        .then((response:any) => {
          this._service
            .getHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`)
            .then((response:any) => {
              this.basicData = response.json().entries;
              this.totalCount = response.json().totalCount;
            })
            .catch((e:any) => {console.log(e)});
        })
        .catch((e:any) => {
          console.log(e)
        });
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
