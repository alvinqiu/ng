import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BuildingClass } from './building-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-buildingsmodal',
  templateUrl: './buildingsmodal.component.html',
  styleUrls: ['./buildingsmodal.component.css']
})
export class BuildingsmodalComponent implements OnInit {
  propertylist = [
    {value: '0', viewValue: '教学楼'},
    {value: '1', viewValue: '行政楼'},
    {value: '2', viewValue: '图书馆'},
    {value: '3', viewValue: '学生宿舍'},
    {value: '4', viewValue: '教室宿舍'},
    {value: '5', viewValue: '实验楼'}

  ]
  model:BuildingClass;
  schoollist: Array<BuildingClass>;
  selectedRows: Array<BuildingClass>;
  condition:object = {
    func : ""
  };
  errorMsg = false;
  status:string;
  dialogModal:MdDialogRef<BuildingsmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<BuildingsmodalComponent>,
    private _service: ApiService

  	) { 
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new BuildingClass();
        this._service
          .getBasicHttp(`/api/bi/building/getBuildingByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.json().entries[0];
          })
          
        break;
      case "check":
        this.status = "check";
        this.model = new BuildingClass();

        this._service
          .getBasicHttp(`/api/bi/building/getBuildingByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.json().entries[0];
          })
          
        break;
      default:
        this.status = "add";
        this.model = new BuildingClass();
        break;
    }

  }

  ngOnInit() {
  }
  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/building/updateBuilding/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/building/addBuilding";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":"refresh", "data": response.json()})
      })
      
  }
}
