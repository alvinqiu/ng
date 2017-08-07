import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-create-qr-code-modal',
  templateUrl: './create-qr-code-modal.component.html',
  styleUrls: ['./create-qr-code-modal.component.css']
})
export class CreateQrCodeModalComponent implements OnInit, AfterViewInit {

  baseDate: any[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any
  ) {
    this.baseDate = groups;
    console.log(this.baseDate);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.baseDate.map(data => {
        console.log(data.asset.seriesNumber);
        JsBarcode(`#barcode${data.id}`, data.asset.seriesNumber, {
          width: 1,
          height: 50
        });
      });
  }

  print() {
    const newWin = window.open('about:blank', '', '');
    const titleHTML = document.getElementById('code').innerHTML;
    newWin.document.write(titleHTML);
    newWin.document.body.setAttribute('style', 'text-align: center');
    newWin.document.location.reload();
    newWin.print();
  }
}
