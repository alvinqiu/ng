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
  school:SchoolInterface;
  selectedRows: Array<SchoolInterface>;
  condition:object = {
    func : ""
  };
  status:string;
  schoollist:Array<SchoolInterface>;
  dialogModal:MdDialogRef<SchoolsmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<SchoolsmodalComponent>,
    private _service: ApiService
  ) { 
    console.log(groups)
    this.schoollist = groups.schoollist;
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.school = new SchoolClass();
        break;
      case "check":
        this.school = new SchoolClass();
        this.status = "check";
        this._service
          .getHttp(`/api/bi/school/1`)
          .then((response:any) => {
            console.log(response)
            // this.basicData = response.json().entries;
            // this.totalCount = response.json().totalCount;
          })
        .catch((e:any) => {console.log(e)});
        break;
      default:
        this.status = "";
        this.school = new SchoolClass();
    }

    
    
  }

  ngOnInit() {
    
  }

  save() {
    console.log(this.school)
    this.dialogModal.close(this.school);
  }

  selectChange() {
    if (this.school.branch == "0") {
      this.school.parent_school = 0;
    }
  }

}
