import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { AssetsClass } from '../../../../class/assets';

@Component({
  selector: 'app-assets-add-modal',
  templateUrl: './assets-add-modal.component.html',
  styleUrls: ['./assets-add-modal.component.css']
})
export class AssetsAddModalComponent implements OnInit {
  types = [
    {id: '1', equipmentTypeName: '点读机'},
    {id: '2', equipmentTypeName: '复读机'},
    {id: '3', equipmentTypeName: '大飞机'}
  ];
  suppliers = [
    {id: '1', supplierName: 'test1'},
    {id: '2', supplierName: 'test2'},
    {id: '3', supplierName: 'test3'}
  ];
  startDate: Date;
  asset: AssetsClass;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<AssetsAddModalComponent>,
    private _service: ApiService
  ) {
    this.asset = new AssetsClass();
  }

  ngOnInit() {
    // 获取类型
    this._service
      .getBasicHttp(`/asset/equipment-types`, (response: any) => {
        this.types = response;
      });
    // 获取供应商
    this._service
      .getBasicHttp(`/asset/equipment-supplier-names`, (response: any) => {
        this.suppliers = response;
      });
  }

  selectedChanged(e: any) {
    // this.asset.purchaseDate = e;
  }

  handleAddAsset() {
    this._service
      .postBasicHttp(`/asset/equipment`, this.asset, (response: any) => {
        this.dialogRef.close({'status': 'refresh', 'data': response.json()});
      });
  }

}
