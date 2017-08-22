import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { SpecificInterface } from '../../interface/specific';
import { SpecificClass } from '../../class/specific';
import {
  TdDialogService
} from '@covalent/core';
@Component({
  selector: 'app-in-out-stock-modal',
  templateUrl: './in-out-stock-modal.component.html',
  styleUrls: ['./in-out-stock-modal.component.css']
})
export class InOutStockModalComponent implements OnInit {
  statusList = [
    { value: '0', viewValue: '出库' },
    { value: '1', viewValue: '入库' }
  ];
  specific: SpecificInterface;
  isDisabled: string;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<InOutStockModalComponent>,
    private _service: ApiService,
    private _dialogService: TdDialogService
  ) {
    this.specific = new SpecificClass();

    this._service.getAssetsHttp(`/equipment-specific-info/${groups}`, (response: any) => {
      this.specific = response;
      if (this.specific.stockStatus == "0") {
        this.specific.stockStatus = "1";
        this.isDisabled = "true";
      } else {
        this.specific.stockStatus = "0";
        this.isDisabled = "false";
      }

    });
  }

  handleSave() {
    this._service
      .postAssetsHttp(`/equipment-specific-stock`, this.specific, (response: any) => {
        this.dialogRef.close({ 'status': 'refresh' });
      });
  }

  changeStaff() {
    console.log("changeStaff");

    this._service
      .getBasicHttp(`/api/bi/staff/getStaffByCondition?staffName=${this.specific.staffName}`, (response: any) => {
        if (response.entries.length == 0) {
          this._dialogService.openAlert({
            message: '未找到此名字!',
            disableClose: true,
            title: '错误',
            closeButton: '关闭',
          });
          this.specific.staffName = "";
        } else {
          this.specific.staffId = response.entries[0].id;
        }
      });
  }

  ngOnInit() {

  }

}
