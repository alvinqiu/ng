import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { GradeClass } from './grade-class';
// import { GradeInterface } from '../../../../interface/grade';
import { ApiService } from '../../../../service/api.service';


@Component({
  selector: 'app-gradesmodal',
  templateUrl: './gradesmodal.component.html',
  styleUrls: ['./gradesmodal.component.css']
})
export class GradesmodalComponent implements OnInit {
  propertylist = [
    {value: 0, viewValue: '学前教育'},
    {value: 1, viewValue: '小学'},
    {value: 2, viewValue: '初中'},
    {value: 3, viewValue: '高中'},
    {value: 4, viewValue: '高等教育'}
  ];
  statuslist = [
    {value: 1, viewValue: '结业'},
    {value: 2, viewValue: '在读'}
  ];
  startDate:Date;
  grade:GradeClass;
  error = {
    label: "",
    msg:  "",
    icon: "",
    color: ""
  };
  errorMsg = false;
  selectedRows: Array<GradeClass>;
  condition:object = {
    func : ""
  };
  status:string;
  dialogModal:MdDialogRef<GradesmodalComponent>;
  closefresh:any;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<GradesmodalComponent>,
    private _service: ApiService
  	) {
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.grade = new GradeClass();
        // document.getElementById('app-loading').style.display = "flex";
        this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.grade = response.json().entries[0];
            this.grade.gradeLevel = new Date(response.json().entries[0].gradeLevel);
            // document.getElementById('app-loading').style.display = "none";
          })
          .catch((e:any) => {
            console.log(e)
            this.errorMsg = true;
            // document.getElementById('app-loading').style.display = "none";
          });
        break;
      case "check":
        this.status = "check";
        this.grade = new GradeClass();
        // document.getElementById('app-loading').style.display = "flex";

        this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.grade = response.json().entries[0];
            this.grade.gradeLevel = new Date(response.json().entries[0].gradeLevel);
            // document.getElementById('app-loading').style.display = "none";
          })
          .catch((e:any) => {
            console.log(e)
            this.errorMsg = true;
            // document.getElementById('app-loading').style.display = "none";
          });
        break;
      default:
        this.startDate = new Date();
        this.status = "add";
        this.grade = new GradeClass();
        break;
    }  
  }

  ngOnInit() {
  }
  selectedChanged(e:any) {
    // this.grade.gradeLevel = Date.parse(e)
  }
  save() {
    let url = "";
    if (this.status == "modify") {
      url = "/api/bi/grade/updateGrade";
    } else {
      url = "/api/bi/grade/addGrade";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postHttp(url, this.grade)
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
