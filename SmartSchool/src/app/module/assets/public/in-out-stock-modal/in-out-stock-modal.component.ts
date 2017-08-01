import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-in-out-stock-modal',
  templateUrl: './in-out-stock-modal.component.html',
  styleUrls: ['./in-out-stock-modal.component.css']
})
export class InOutStockModalComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<InOutStockModalComponent>
  ) { }

  ngOnInit() {
  }

}
