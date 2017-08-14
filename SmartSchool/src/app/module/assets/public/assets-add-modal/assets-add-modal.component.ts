import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { AssetsClass } from '../../class/assets';

@Component({
  selector: 'app-assets-add-modal',
  templateUrl: './assets-add-modal.component.html',
  styleUrls: ['./assets-add-modal.component.css']
})
export class AssetsAddModalComponent implements OnInit {
  types = [];
  suppliers = [];
  startDate: Date;
  asset: AssetsClass;
  status: string;
  title: string;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<AssetsAddModalComponent>,
    private _service: ApiService
  ) {
    switch (groups.condition.func) {
      case 'add':
        this.status = 'add';
        this.title = '新增资产';
        this.asset = new AssetsClass();
        break;
      case 'edit':
        this.status = 'edit';
        this.title = '编辑资产';
        this.asset = groups.asset;
        break;
    }
  }

  ngOnInit() {
    // 获取类型
    this._service
      .getAssetsHttp(`/equipment-types`, (response: any) => {
        this.types = response;
      });
    // 获取供应商
    this._service
      .getAssetsHttp(`/equipment-supplier-names`, (response: any) => {
        this.suppliers = response;
      });
  }

  selectedChanged(e) {
    // this.asset.purchaseDate = e;
  }

  handleAsset() {
    if (this.status === 'add') {
      this._service
        .postAssetsHttp(`/equipment`, this.asset, (response: any) => {
          this.dialogRef.close({ 'status': 'refresh' });
        });
    } else {
      this._service
        .postAssetsHttp(`/equipment-general/${this.asset.id}`, this.asset, (response: any) => {
          this.dialogRef.close({ 'status': 'refresh' });
        });
    }
  }

}
