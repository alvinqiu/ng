import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { OfficeClass } from './office-class';
import { ApiService } from '../../../../service/api.service';
import { SchoolClass } from '../schoolsmodal/school-class';
@Component({
  selector: 'app-officesmodal',
  templateUrl: './officesmodal.component.html',
  styleUrls: ['./officesmodal.component.css']
})
export class OfficesmodalComponent implements OnInit {
  buildinglist = [];
  propertylist = [
    { value: 0, viewValue: '教室' },
    { value: 1, viewValue: '办公室' },
    { value: 2, viewValue: '实验室' },
    { value: 3, viewValue: '行政室' }
  ];
  model: OfficeClass;
  schoolsList: Array<SchoolClass>;
  selectedRows: Array<OfficeClass>;
  condition: object = {
    func: ""
  };
  errorMsg = false;
  status: string;
  dialogModal: MdDialogRef<OfficesmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<OfficesmodalComponent>,
    private _service: ApiService
  ) {
    this.buildinglist = groups.buildinglist;
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch (groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new OfficeClass();
        this._service
          .getBasicHttp(`/api/bi/room/getRoomByCondition?id=${this.selectedRows[0].id}`, (response: any) => {
            this.model = response.entries[0];
          })

        break;
      case "check":
        this.status = "check";
        this.model = new OfficeClass();

        this._service
          .getBasicHttp(`/api/bi/room/getRoomByCondition?id=${this.selectedRows[0].id}`, (response: any) => {
            this.model = response.entries[0];
          })

        break;
      default:
        this.status = "add";
        this.model = new OfficeClass();
        break;
    }

    this._service
      .getBasicHttp(`/api/bi/school/getSchoolByCondition`, (response: any) => {
        this.schoolsList = response.entries;
      });
  }

  ngOnInit() {
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/room/updateRoom/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/room/addRoom";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response: any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({ "status": "refresh", "data": response })
      })

  }
}
