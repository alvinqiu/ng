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
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]
  model:ClassClass;
  schoollist: Array<ClassClass>;
  selectedRows: Array<ClassClass>;
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
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new ClassClass();
        this._service
          .getHttp(`/api/bi/class/getClassByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.model = response.json().entries[0];
          })
          .catch((e:any) => {
            console.log(e)
            this.errorMsg = true;
          });
        break;
      case "check":
        this.status = "check";
        this.model = new ClassClass();

        this._service
          .getHttp(`/api/bi/class/getClassByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.model = response.json().entries[0];
          })
          .catch((e:any) => {
            console.log(e)
            this.errorMsg = true;
          });
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
      .postHttp(url, this.model)
      .then((response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":"refresh", "data": response.json()})
      })
      .catch((e:any) => {
        console.log(e.json())
        this.errorMsg = true;
        document.getElementById('app-loading').style.display = "none";
      });
  }

}
