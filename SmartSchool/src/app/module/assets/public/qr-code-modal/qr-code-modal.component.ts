import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AssetsClass } from '../../../../class/assets';
import { AssetsInterface } from '../../../../interface/assets';
import { ApiService } from '../../../../service/api.service';
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
    private dialogInOutStockModal: MdDialog,
    private _service: ApiService
  ) {
    this.assets = new AssetsClass();
  }

  ngOnInit() {
  }

  getInOutStock() {
    this.assets = new AssetsClass();

    this.dialogQrCodeModal.close();
    this.dialogInOutStockModal.open(InOutStockModalComponent);

    // this._service.getHttp(`/api/bi/assets/getInOutStock?id=${this.assets.id}`)
    //   .then((response: any) => {
    //     this.assets = response.json().entries;
    //     this.dialogQrCodeModal.close(response.json());
    //     this.dialogInOutStockModal.open(InOutStockModalComponent);
    //   })
    //   .catch((e: any) => {console.log(e)});
  }
}
