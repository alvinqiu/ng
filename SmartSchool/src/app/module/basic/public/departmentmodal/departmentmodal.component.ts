import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DepartmentClass } from './department-class';
import { ApiService } from '../../../../service/api.service';
import { BuildingClass } from '../buildingsmodal/building-class';
@Component({
  selector: 'app-departmentmodal',
  templateUrl: './departmentmodal.component.html',
  styleUrls: ['./departmentmodal.component.css']
})
export class DepartmentmodalComponent implements OnInit {

  buildings:Array<BuildingClass>;
  departments:Array<DepartmentClass>;
  condition:object = {
    func : ""
  };
  model:DepartmentClass;
  status:string;
  dialogModal:MdDialogRef<DepartmentmodalComponent>;
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
    private dialogRef: MdDialogRef<DepartmentmodalComponent>,
    private _service: ApiService
  ) { 
  	this.dialogModal = dialogRef;
    this.buildings = groups.buildings;
    this.departments = groups.departments;
    switch(groups.func) {
      case "modify":
        this.status = "modify"; 
        this.model = new DepartmentClass();
        this._service
          .getBasicHttp(`/api/bi/department/getDepartmentByCondition?id=`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      default:
        this.status = "add";
        this.model = new DepartmentClass();
        break;
    }
  }

  ngOnInit() {
  }

  save() {
    let url = "";
    let status = "";
    if (this.status == "modify") {
      url = `/api/bi/department/updateDepartment/`;
      status = "modify";
    } else {
      url = "/api/bi/department/addDepartment";
      status = "add"
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":status, "data": response})
      })
      
  }
}
