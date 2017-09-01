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
    { name: 'birthDate', label: '出生年月', format: v => v ? `${new Date(v).getFullYear()}-${new Date(v).getMonth()+1}-${new Date(v).getDay()}` : '' },
    {
      name: 'gender', label: '性别',
      format: v => {
        switch (v) {
          case 0:
            return "男";
          case 1:
            return "女";
          default:
            return ""
        }
      }
    },
    { name: 'duty', label: '职务' },
    // { name: 'staffAttrName', label: '属性' },
    // { name: 'deptName', label: '部门' },
    {
      name: 'register', label: '是否已生成账户',
      format: v => {
        if (v) {
          return "是";
        } else {
          return "否";
        }
      }
    },
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
  searchInputTerm: string = "";
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
      });
  }

  selectEvent(e: any): any {

  }

  openDialog(condition: any): void {
    condition.selectedRows = this.selectedRows;
    if ((condition.func == "edit" || condition.func == "check") && condition.selectedRows.length == 0) {
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
    this.pageSize = 20;
    this._service
      .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}`, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
        this.pageSize = response.pageSize;
      });
  }


  change(event: IPageChangeEvent): void {
    let url = "";
    if (this.foodValue != "") {
      url = `/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}`;
    } else {
      url = `/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`;
    }
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(url, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      });
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
  }

  searchByDepartment(e): void {
    this.searchDepartment = e.split("_")[1];
    this.page = 1;
    let url = "";
    if (this.foodValue != "") {
      url = `/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}&${this.foodValue}=${this.searchInputTerm}`;
    } else {
      url = `/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`;
    }

    this._service
      .getBasicHttp(url, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      });
  }
  createAdmin() {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择操作信息", "color": "accent", "icon": "error" },
        width: "60%"
      });
    } else {
      this._service
        .postBasicHttp(`/user/generateRoleUser`, { "staffCode": this.selectedRows[0].staffCode, "roleType": 2 }, (response: any) => {
          let dialogRef = this.dialog.open(MsgmodalComponent, {
            data: { "label": "成功", "msg": "创建成功", "color": "accent", "icon": "error" },
            width: "60%"
          });
          this._service
            .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
            });
        });
    }
  }
  resetPassword() {
    if (this.selectedRows.length > 0) {
      let reqlist = this.selectedRows.map(item => item.staffCode);
      let del = `staffCodes=${reqlist.join('&staffCodes=')}`
      console.log(del)
      this._service
        .putBasicHttp(`/user/resetUserPasswd`, del, (response: any) => {
          let dialogRef = this.dialog.open(MsgmodalComponent, {
            data: { "label": "成功", "msg": "重置密码成功", "color": "accent", "icon": "error" },
            width: "60%"
          });

        })

    } else {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择要一条信息", "color": "accent", "icon": "error" },
        width: "60%"
      });
    }
  }
  createAccount() {
    if (this.selectedRows.length > 0) {
      let reqlist = this.selectedRows.map(item => {
        if (!item.register) {
          return item.staffCode;
        }
      });
      let del = `staffCodes=${reqlist.join('&staffCodes=')}`

      this._service
        .postBasicDelHttp(`/user/generateUsers`, del, (response: any) => {
          let dialogRef = this.dialog.open(MsgmodalComponent, {
            data: { "label": "成功", "msg": "创建成功", "color": "accent", "icon": "error" },
            width: "60%"
          });
          this._service
          .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
            this.basicData = response.entries;
            this.totalCount = response.totalCount;
          });
        });
    } else {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择一条信息", "color": "accent", "icon": "error" },
        width: "60%"
      });
    }
  }
  delete() {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择要操作的信息", "color": "accent", "icon": "error" },
        width: "60%"
      });
    } else {
      let reqlist = this.selectedRows.map(item => item.id);
      let del = `staffIds=${reqlist.join('&staffIds=')}`

      this._service
        .postBasicDelHttp(`/api/bi/staff/delStaff`, del, (response: any) => {
          this._service
            .getBasicHttp(`/api/bi/staff/getStaffByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              this.selectedRows = [];
            });

        })
    }
  }

}
