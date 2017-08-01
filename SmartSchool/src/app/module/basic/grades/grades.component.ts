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
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  basicData: Array<GradeInterface>;
  columns: ITdDataTableColumn[] = [
    { name: 'gradeName', label: '年级名字' },
    { name: 'gradeAttr', label: '年级属性' },
    { name: 'gradeLevel', label: '入学年' },
    { name: 'gradeManagerName', label: '年级负责人' },
    { name: 'status', label: '状态' },
    { name: 'schoolName', label: '学校' },
    { name: 'gradeDesc', label: '描述' },
    
  ];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSize: number = 20;
  page: number;
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
        .getHttp("/api/bi/grade/getGradeByCondition?page=1&pageSize=20")
        .then((response:any) => {
          this.basicData = response.json().entries;
          this.totalCount = response.json().totalCount;
        })
        .catch((e:any) => {console.log(e)});
  }

  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
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
      });
    }
    
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this._service
      .getHttp(`/api/bi/grade/getGradeByCondition?page=1&pageSize=2&gradeName=${searchInputTerm}`)
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
    this.event = event;
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
      this._service
        .postHttp(`/api/bi/grade/delGrade`, reqlist)
        .then((response:any) => {
          console.log(response)
          // this.basicData = response.json().entries;
          // this.totalCount = response.json().totalCount;
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
