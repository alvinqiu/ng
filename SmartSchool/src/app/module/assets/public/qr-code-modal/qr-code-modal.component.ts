import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AssetsClass } from '../../../../class/assets';
import { AssetsInterface } from '../../../../interface/assets';
import { InOutStockModalComponent } from '../in-out-stock-modal/in-out-stock-modal.component';
@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.css']
})
export class QrCodeModalComponent implements OnInit {
  assets: AssetsInterface;

  constructor(
    private dialogQrCodeModal: MdDialogRef<QrCodeModalComponent>,
    private dialogInOutStockModal: MdDialog
  ) {
    this.assets = new AssetsClass();
  }

  ngOnInit() {
  }

  getInOutStock() {
    this.dialogQrCodeModal.close();
    this.dialogInOutStockModal.open(InOutStockModalComponent, {
      data: this.assets.id,
      width: '60%'
    });
  }
}
