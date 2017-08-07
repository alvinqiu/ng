import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-create-qr-code-modal',
  templateUrl: './create-qr-code-modal.component.html',
  styleUrls: ['./create-qr-code-modal.component.css']
})
export class CreateQrCodeModalComponent implements OnInit {

  baseDate: any[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any
  ) {
    this.baseDate = groups;
    console.log(this.baseDate);
  }

  ngOnInit() {
    this.baseDate.map(data => {
      JsBarcode(`#barcode${data.id}`, data.asset.seriesNumber, {
        width: 4,
        height: 30
      });
    });
  }
  print() {

  }
}
