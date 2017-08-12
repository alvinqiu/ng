import { Component, OnInit } from '@angular/core';
import { StaffsmodalComponent } from '../../public/staffsmodal/staffsmodal.component';

import {
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';

import { MdDialog } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { MsgmodalComponent } from '../../public/msgmodal/msgmodal.component';
@Component({
  selector: 'app-staffunaccount',
  templateUrl: './staffunaccount.component.html',
  styleUrls: ['./staffunaccount.component.css']
})
export class StaffunaccountComponent implements OnInit {

  basicData: any[] = [];
  columns: ITdDataTableColumn[] = [
    { name: 'staffCode', label: '教职工编号' },
    { name: 'staffName', label: '姓名' },
    { name: 'passNumber', label: '证件号' },
    { name: 'birthDate', label: '出生年月' },
    {
      name: 'gender', label: '性别',
      format: v => {
        switch (v) {
          case 0:
            return "女";
          case 1:
            return "男";
          default:
            return ""
        }
      }
    },
    { name: 'duty', label: '职务' },
    { name: 'staffAttribute', label: '属性' },
    { name: 'deptId', label: '部门' },
  ];
  foods = [
    { value: 'staffCode', viewValue: '教职工编号' },
    { value: 'staffName', viewValue: '姓名' },
    { value: 'passNumber', viewValue: '证件号' }
  ]
  nodes = [];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string;
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 20;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  searchDepartment: string = "";
  foodValue: string = "";
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { }

  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
        document.getElementById('app-loading').style.display = "none";
      });

    this._service
      .getBasicHttp(`/api/bi/department/getDepartmentAttr`, (response: any) => {
        this.nodes = response;
      })
  }

  selectEvent(e: any): any {
    console.log(e)
    console.log(this.selectedRows)
  }

  openDialog(condition: any): void {
    condition.selectedRows = this.selectedRows;
    if (condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择要操作的信息", "color": "accent", "icon": "error" },
        width: "60%"
      });
    } else {
      let dialogRef = this.dialog.open(StaffsmodalComponent, {
        data: condition,
        width: "60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
          this.selectedRows = [];
          this._service
            .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
            });
        }
      });
    }
  }

  handleSearch(searchInputTerm: string): void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}`, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      });
  }


  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}&departmentId=${this.searchDepartment}`, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      });
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }

  searchByDepartment(e): void {
    if (e.indexOf("g_") > -1) {
      this.searchDepartment = e.split("g_")[1];
      this.page = 1;
      this._service
        .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}&departmentId=${this.searchDepartment}`, (response: any) => {
          this.basicData = response.entries;
          this.totalCount = response.totalCount;
        })
    } else {
      this.searchDepartment = "";
      this.page = 1;
      this._service
        .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}&departmentId=${this.searchDepartment}`, (response: any) => {
          this.basicData = response.entries;
          this.totalCount = response.totalCount;
        })
    }
  }

}
