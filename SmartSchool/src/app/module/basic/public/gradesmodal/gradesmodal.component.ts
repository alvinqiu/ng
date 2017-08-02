import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { GradeClass } from '../../../../class/grade';
import { GradeInterface } from '../../../../interface/grade';
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
  startDate:Date;
  grade:GradeInterface;
  selectedRows: Array<GradeInterface>;
  condition:object = {
    func : ""
  };
  status:string;
  gradelist:Array<GradeInterface>;
  dialogModal:MdDialogRef<GradesmodalComponent>;
  closefresh:any;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<GradesmodalComponent>,
    private _service: ApiService
  	) {
    this.gradelist = groups.gradelist;
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.grade = new GradeClass();
        this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.grade = response.json().entries[0];
          })
          .catch((e:any) => {console.log(e)});
        break;
      case "check":
        this.status = "check";
        this.grade = new GradeClass();
        this._service
          .getHttp(`/api/bi/grade/getGradeByCondition?id=${this.selectedRows[0].id}`)
          .then((response:any) => {
            this.grade = response.json().entries[0];
            this.grade.gradeLevel == 0?
              this.startDate = new Date()
              :
              this.startDate = new Date(this.grade.gradeLevel)
            
          })
          .catch((e:any) => {console.log(e)});
        break;
      default:
        this.startDate = new Date();
        this.status = "";
        this.grade = new GradeClass();
    }  
  }

  ngOnInit() {
  }
  selectedChanged(e:any) {
    this.grade.gradeLevel = Date.parse(e)
  }
  save() {
    let url = "";
    if (this.status = "check") {
      url = `/api/bi/grade/updateGrade/${this.grade.id}`
    } else {
      url = "/api/bi/grade/addGrade"
    }
    
    this._service
      .postHttp(url, this.grade)
      .then((response:any) => {
        this.dialogModal.close({"status":"refresh"})
      })
      .catch((e:any) => {console.log(e)});
    
    
  }

}
