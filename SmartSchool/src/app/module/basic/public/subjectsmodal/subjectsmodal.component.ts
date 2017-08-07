import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SubjectClass } from './subject-class';
import { ApiService } from '../../../../service/api.service';
@Component({
  selector: 'app-subjectsmodal',
  templateUrl: './subjectsmodal.component.html',
  styleUrls: ['./subjectsmodal.component.css']
})
export class SubjectsmodalComponent implements OnInit {
  propertylist = [
    {value: '0', viewValue: '必修'},
    {value: '1', viewValue: '选修'}
  ]
  model:SubjectClass;
  schoollist: Array<SubjectClass>;
  selectedRows: Array<SubjectClass>;
  condition:object = {
    func : ""
  };
  errorMsg = false;
  status:string;
  dialogModal:MdDialogRef<SubjectsmodalComponent>;
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<SubjectsmodalComponent>,
    private _service: ApiService
  	) { 

    this.selectedRows = groups.selectedRows;
    this.dialogModal = dialogRef;
    switch(groups.func) {
      case "modify":
        this.status = "modify";
        this.model = new SubjectClass();
        this._service
          .getHttp(`/api/bi/subject/getSubjectByCondition?id=${this.selectedRows[0].id}`)
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
        this.model = new SubjectClass();

        this._service
          .getHttp(`/api/bi/subject/getSubjectByCondition?id=${this.selectedRows[0].id}`)
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
        this.model = new SubjectClass();
        break;
    }



  }

  ngOnInit() {
  }

  save() {
    let url = "";
    if (this.status == "modify") {
      url = `/api/bi/subject/updateSubject/${this.selectedRows[0].id}`;
    } else {
      url = "/api/bi/subject/addSubject";
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
