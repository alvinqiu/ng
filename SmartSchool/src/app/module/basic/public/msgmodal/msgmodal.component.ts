import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-msgmodal',
  templateUrl: './msgmodal.component.html',
  styleUrls: ['./msgmodal.component.css']
})
export class MsgmodalComponent implements OnInit {
  msg:string = "";
  label:string = "";
  color:string = "";
  icon:string = "";
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<MsgmodalComponent>,
  	) {
  	this.msg = groups.msg;
  	this.label = groups.label;
  	this.color = groups.color;
  	this.icon = groups.icon;
  }

  ngOnInit() {
  }

}
