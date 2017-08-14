import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CourseClass } from './course-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-coursemodal',
  templateUrl: './coursemodal.component.html',
  styleUrls: ['./coursemodal.component.css']
})
export class CoursemodalComponent implements OnInit {
  requirelist = [
    {value: 0, viewValue: '否'},
    {value: 1, viewValue: '是'},
  ];
  // propertylist = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  gradelist = [];
  subjectlist = [];
  model:CourseClass;
  schoollist: Array<CourseClass>;
  selectedRows: Array<CourseClass>;
  condition:object = {
    func : ""
  };
  errorMsg = false;
  status:string;
  dialogModal:MdDialogRef<CoursemodalComponent>;
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<CoursemodalComponent>,
    private _service: ApiService
  	) { 
  	this.selectedRows = groups.selectedRows;
    this.subjectlist = groups.subjectlist;
    this.gradelist = groups.gradelist;
    this.dialogModal = dialogRef;

    switch(groups.func) {

      case "modify":
        this.status = "modify";
        this.model = new CourseClass();
        this._service
          .getBasicHttp(`/api/bi/course/getCourseByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      case "check":
        this.status = "check";
        this.model = new CourseClass();

        this._service
          .getBasicHttp(`/api/bi/course/getCourseByCondition?id=${this.selectedRows[0].id}`, (response:any) => {
            this.model = response.entries[0];
          })
          
        break;
      default:
        this.status = "add";
        this.model = new CourseClass();
        break;
    }
  }

  ngOnInit() {
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/course/updateCourse/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/course/addCourse";
    }
    document.getElementById('app-loading').style.display = "flex";
    this._service
      .postBasicHttp(url, this.model, (response:any) => {
        document.getElementById('app-loading').style.display = "none";
        this.dialogModal.close({"status":"refresh", "data": response})
      })
      
  }

}
