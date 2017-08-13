import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DepartmentClass } from './department-class';
import { BuildingClass } from '../buildingsmodal/building-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-departmentmodal',
  templateUrl: './departmentmodal.component.html',
  styleUrls: ['./departmentmodal.component.css']
})
export class DepartmentmodalComponent implements OnInit {
  buildingList: Array<BuildingClass>;
  departmentList: Array<DepartmentClass>;
  model: DepartmentClass;
  status: string;
  dialogModal: MdDialogRef<DepartmentmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<DepartmentmodalComponent>,
    private _service: ApiService
  ) {
    this.dialogModal = dialogRef;
    switch (groups.func) {
      case "modify":
        this.status = "modify";
        this.model = groups.departments;
        break;
      default:
        this.status = "add";
        this.model = new DepartmentClass();
        break;
    }
  }

  ngOnInit() {
    this._service
      .getBasicHttp(`/api/bi/department/getDepartmentByCondition`, (response: any) => {
        this.departmentList = response.entries;
      });

    this._service
      .getBasicHttp(`/api/bi/building/getBuildingByCondition`, (response: any) => {
        this.buildingList = response.entries;
      });
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/department/updateDepartment/${this.model.id}`;
    } else {
      url = "/api/bi/department/addDepartment";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response: any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogRef.close({ "status": "refresh", "data": response })
      });
  }
}
