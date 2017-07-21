import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-subjectsmodal',
  templateUrl: './subjectsmodal.component.html',
  styleUrls: ['./subjectsmodal.component.css']
})
export class SubjectsmodalComponent implements OnInit {
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]
  data = {
    "name":"",
    "tel":"",
    "address": ""
  }
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<SubjectsmodalComponent>
  	) { }

  ngOnInit() {
  }

}
