import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  TdDialogService
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { DepartmentmodalComponent } from '../public/departmentmodal/departmentmodal.component';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { DepartmentClass } from '../public/departmentmodal/department-class';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  nodes = [];
  departments: DepartmentClass;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService,
    private _dialogService: TdDialogService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.departments = new DepartmentClass();

    this._service
      .getBasicHttp(`/api/bi/department/getDepartmentAttr`, (response: any) => {
        this.nodes = response;
      });
  }

  openDialog(condition: any): void {
    condition.departments = this.departments;
    let dialogRef = this.dialog.open(DepartmentmodalComponent, {
      data: condition,
      width: "60%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this._service
        .getBasicHttp(`/api/bi/department/getDepartmentAttr`, (response: any) => {
          this.nodes = response;
        });
    });
  }

  delete(): void {
    this._dialogService.openConfirm({
      message: '确认删除此部门吗?',
      disableClose: true,
      cancelButton: '取消',
      acceptButton: '确定',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        let del = `departmentIds=${this.departments.id}`;
        this._service
          .postBasicDelHttp(`/api/bi/department/delDepartment`, del, (response: any) => {
            this.departments = new DepartmentClass();
          });
      }
    });
  }

  searchByid(id: any): void {
    if (id.indexOf("g_") > -1) {
      this.departments.id = id.split("g_")[1];
    } else {
      this.departments.id = id.split("a_")[1];
    }
    this._service
      .getBasicHttp(`/api/bi/department/getDepartmentByCondition?id=${this.departments.id}`, (response: any) => {
        this.departments = response.entries;
        this.ref.markForCheck();
        this.ref.detectChanges();
      });
  }
}
