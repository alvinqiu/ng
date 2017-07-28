import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SchoolClass } from '../../../../class/school';
import { SchoolInterface } from '../../../../interface/school';

@Component({
  selector: 'app-schoolsmodal',
  templateUrl: './schoolsmodal.component.html',
  styleUrls: ['./schoolsmodal.component.css']
})
export class SchoolsmodalComponent implements OnInit {
   
  YesOrNo = [
    {value: '1', viewValue: '否'},
    {value: '2', viewValue: '是'},
  ]
  school:SchoolInterface;
  condition:object = {
    func : ""
  };
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<SchoolsmodalComponent>
  ) { 
    console.log(groups)
    switch(groups.func) {
      case "modify":
        break;
      case "check":
        break;
      default:
        this.school = new SchoolClass();
    }

    
    
  }

  ngOnInit() {
    
  }

  save() {
    console.log(this.school)
  }

  selectChange() {
    console.log(this.school)
  }

}
