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
    {value: '0', viewValue: '学前教育'},
    {value: '1', viewValue: '小学'},
    {value: '2', viewValue: '初中'},
    {value: '3', viewValue: '高中'},
    {value: '4', viewValue: '高等教育'}
  ];
  startDate = new Date();
  grade:GradeInterface;
  selectedRows: Array<GradeInterface>;
  condition:object = {
    func : ""
  };
  status:string;
  gradelist:Array<GradeInterface>;
  dialogModal:MdDialogRef<GradesmodalComponent>;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<GradesmodalComponent>,
    private _service: ApiService
  	) {
    this.gradelist = groups.schoollist;
    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.grade = new GradeClass();
        break;
      case "check":
        this.grade = new GradeClass();
        this.status = "check";
        this._service
          .getHttp(`/api/bi/school/1`)
          .then((response:any) => {
            console.log(response)
          })
        .catch((e:any) => {console.log(e)});
        break;
      default:
        this.status = "";
        this.grade = new GradeClass();
    }  
  }

  ngOnInit() {
  }
  save() {
    this._service
      .postHttp(`/api/bi/grade/addGrade`, this.grade)
      .then((response:any) => {
        console.log(response)
      })
      .catch((e:any) => {console.log(e)});
    
  }

}
