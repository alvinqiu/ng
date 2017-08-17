import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
  msg:string = "";
  label:string = "";
  color:string = "";
  icon:string = "";
  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<MsgComponent>,

  	) { 
  	this.msg = groups.msg;
  	this.label = groups.label;
  	this.color = groups.color;
  	this.icon = groups.icon;

  }

  ngOnInit() {
  }

}
