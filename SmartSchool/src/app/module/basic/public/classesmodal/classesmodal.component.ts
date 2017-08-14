import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ClassClass } from './class-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-classesmodal',
  templateUrl: './classesmodal.component.html',
  styleUrls: ['./classesmodal.component.css']
})
export class ClassesmodalComponent implements OnInit {
  stafflist=[];
  model:ClassClass;
  schoollist: Array<ClassClass>;
  selectedRows: Array<ClassClass>;
  gradelist = [];
  condition:object = {
    func : ""
  };
  errorMsg = false;
  status:string;
  dialogModal:MdDialogRef<ClassesmodalComponent>;
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<ClassesmodalComponent>,
    private _service: ApiService
  ) {
    this.selectedRows = groups.selectedRows;
    this.gradelist = groups.gradelist;
    this.stafflist = groups.stafflist;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new ClassClass();
        this._service
          .getBasicHttp(`/api/bi/class/getClassByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      case "check":
        this.status = "check";
        this.model = new ClassClass();

        this._service
          .getBasicHttp(`/api/bi/class/getClassByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      default:
        this.status = "add";
        this.model = new ClassClass();
        break;
    }
  }

  ngOnInit() {
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/class/updateClass/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/class/addClass";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":"refresh", "data": response})
      })
      
  }

}
