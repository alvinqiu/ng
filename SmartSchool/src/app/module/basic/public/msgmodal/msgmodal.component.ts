import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-msgmodal',
  templateUrl: './msgmodal.component.html',
  styleUrls: ['./msgmodal.component.css']
})
export class MsgmodalComponent implements OnInit {

  constructor(
  	@Inject(MD_DIALOG_DATA) groups: any,
  	private dialogRef: MdDialogRef<MsgmodalComponent>,
  	) { }

  ngOnInit() {
  }

}
