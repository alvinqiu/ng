import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-staffsattributemodal',
  templateUrl: './staffsattributemodal.component.html',
  styleUrls: ['./staffsattributemodal.component.css']
})
export class StaffsattributemodalComponent implements OnInit {
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any, 
  	private dialogRef: MdDialogRef<StaffsattributemodalComponent>
  	) { }

  ngOnInit() {
  }

}
