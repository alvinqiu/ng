import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SchoolClass } from '../../../../class/school';
import { SchoolInterface } from '../../../../interface/school';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-schoolsmodal',
  templateUrl: './schoolsmodal.component.html',
  styleUrls: ['./schoolsmodal.component.css']
})
export class SchoolsmodalComponent implements OnInit {
   
  YesOrNo = [
    {value: '0', viewValue: '否'},
    {value: '1', viewValue: '是'},
  ]
  model:SchoolInterface;
  schoollist: Array<SchoolInterface>;
  selectedRows: Array<SchoolInterface>;
  condition:object = {
    func : ""
  };
  errorMsg = false;
  status:string;
  dialogModal:MdDialogRef<SchoolsmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<SchoolsmodalComponent>,
    private _service: ApiService
  ) { 
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new SchoolClass();
        this._service
          .getBasicHttp(`/api/bi/school/getSchoolByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      case "check":
        this.status = "check";
        this.model = new SchoolClass();

        this._service
          .getBasicHttp(`/api/bi/school/getSchoolByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      default:
        this.status = "add";
        this.model = new SchoolClass();
        break;
    }

    
    
  }

  ngOnInit() {
    
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/school/updateSchool/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/school/addSchool";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":"refresh", "data": response})
      })
      
  }

  selectChange() {
    if (this.model.branch == "0") {
      this.model.parent_school = 0;
    }
  }

}
