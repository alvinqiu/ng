import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { SchoolsmodalComponent } from '../public/schoolsmodal/schoolsmodal.component';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { SchoolInterface } from '../../../interface/school';

import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  basicData: Array<SchoolInterface>;
  columns: ITdDataTableColumn[] = [
    { name: 'code', label: '学校ID' },
    { name: 'name', label: '学校名称' },
    // { name: 'addr', label: '学校地址' },
    { name: 'branch', label: '是否是分校' },
    { name: 'parent_school', label: '隶属学校' },
    { name: 'nominated_contact_person', label: '校长' },
    { name: 'office_no', label: '办公室电话' },
    { name: 'nominated_contact_no', label: '移动电话' },
    
  ];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;

  searchInputTerm: string = "";
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { 

    
  }
  
  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getHttp(`/api/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}`)
          .then((response:any) => {
            this.basicData = response.json().entries;
            this.totalCount = response.json().totalCount;
            document.getElementById('app-loading').style.display = "none";
          })
          .catch((e:any) => {
            console.log(e)
            document.getElementById('app-loading').style.display = "none";
          });
  }

  selectEvent(e:any):any {
    this.selectedRows = e;
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(SchoolsmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getHttp(`/api/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
            .then((response:any) => {
              this.basicData = response.json().entries;
              this.totalCount = response.json().totalCount;
              
            })
            .catch((e:any) => {
              console.log(e)
            });
        }
      });
    }
    
  }
  delete():void {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要删除的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      
      // let reqlist = this.selectedRows.map( item => item.id);
      // let del = `gradeIds=${reqlist.join('&gradeIds=')}`

      // this._service
      //   .postDelHttp(`/api/bi/grade/delGrade`, del)
      //   .then((response:any) => {
      //     this._service
      //       .getHttp(`/api/bi/grade/getGradeByCondition?page=${this.page}&pageSize=${this.pageSize}`)
      //       .then((response:any) => {
      //         this.basicData = response.json().entries;
      //         this.totalCount = response.json().totalCount;
      //         this.selectedRows = [];
      //       })
      //       .catch((e:any) => {console.log(e)});
      //   })
      //   .catch((e:any) => {
      //     console.log(e)
      //   });
    }
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getHttp(`/api/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`)
      .then((response:any) => {
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
      .getHttp(`/api/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
      .then((response:any) => {
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      });
  }


  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    // console.log(sortEvent)
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
}
