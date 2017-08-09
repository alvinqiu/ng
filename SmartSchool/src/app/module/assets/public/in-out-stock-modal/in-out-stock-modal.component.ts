import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { SpecificInterface } from '../../../../interface/specific';
import { SpecificClass } from '../../../../class/specific';

@Component({
  selector: 'app-in-out-stock-modal',
  templateUrl: './in-out-stock-modal.component.html',
  styleUrls: ['./in-out-stock-modal.component.css']
})
export class InOutStockModalComponent implements OnInit {
  statusList = [
    {value: 0, viewValue: '出库'},
    {value: 1, viewValue: '入库'}
  ];
  specific: SpecificInterface;

  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private dialogRef: MdDialogRef<InOutStockModalComponent>,
    private _service: ApiService
  ) {
    this.specific = new SpecificClass();

    this._service.getAssetsHttp(`/equipment-specific-info/${groups}`)
      .then((response: any) => {
        this.specific = response;
      });
  }

  handleSave() {
    this._service
      .postAssetsHttp(`/equipment-specific-stock`, this.specific, (response: any) => {
        this.dialogRef.close({'status': 'refresh', 'data': response.json()});
      });
  }

  ngOnInit() {

  }

}
