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
    { name: 'branch', label: '是否是分校', format: v =>  {
      switch(v){
          
          case 1 :
            return "是";
            // break;
          case 2 :
            return "否";
            // break;
          default:
            return ""
        }
    }},
    { name: 'parentSchool', label: '隶属学校' },
    { name: 'nominatedContactPerson', label: '校长' },
    { name: 'officeNo', label: '办公室电话' },
    { name: 'nominatedContactNo', label: '移动电话' },
    
  ];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  searchInputTerm: string = "";
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  schoollist = [];
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { 

    
  }
  
  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getBasicHttp(`/api/bi/school/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
            this.basicData = response.entries;
            this.totalCount = response.totalCount;
            document.getElementById('app-loading').style.display = "none";
          })
      this._service
          .getBasicHttp(`/api/bi/school/getSchoolByCondition`, (response:any) => {
            this.schoollist = response.entries;
          })
          
  }

  selectEvent(e:any):any {
    this.selectedRows = e;
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    condition.schoollist = this.schoollist;
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
            .getBasicHttp(`/api/bi/school/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              
            })
            
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
      
      let reqlist = this.selectedRows.map( item => item.id);
      let del = `schoolIds=${reqlist.join('&schoolIds=')}`

      this._service
        .postBasicDelHttp(`/api/bi/school/delSchool`, del, (response:any) => {
          this._service
            .getBasicHttp(`/api/bi/school/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
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
      .getBasicHttp(`/api/bi/school/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/school/getSchoolByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }


  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    // console.log(sortEvent)
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
}
