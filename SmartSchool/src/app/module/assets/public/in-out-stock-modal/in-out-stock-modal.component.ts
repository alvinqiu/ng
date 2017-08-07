import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { AssetsInterface } from '../../../../interface/assets';
import { AssetsClass } from '../../../../class/assets';

@Component({
  selector: 'app-in-out-stock-modal',
  templateUrl: './in-out-stock-modal.component.html',
  styleUrls: ['./in-out-stock-modal.component.css']
})
export class InOutStockModalComponent implements OnInit {
  types = [
    {value: '1', viewValue: '点读机'},
    {value: '2', viewValue: '复读机'},
    {value: '3', viewValue: '大飞机'}
  ];
  statusList = [
    {value: 1, viewValue: '出库'},
    {value: 2, viewValue: '入库'}
  ];
  assets: AssetsInterface;

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<InOutStockModalComponent>,
    private _service: ApiService
  ) {
    this.assets = new AssetsClass();

    // this._service.getHttp(`/api/bi/assets/getInOutStock?id=${groups}`)
    //   .then((response: any) => {
    //     this.assets = response.json().entries;
    //     this.dialogQrCodeModal.close(response.json());
    //     this.dialogInOutStockModal.open(InOutStockModalComponent);
    //   })
    //   .catch((e: any) => {console.log(e)});
  }

  ngOnInit() {
  }

}
