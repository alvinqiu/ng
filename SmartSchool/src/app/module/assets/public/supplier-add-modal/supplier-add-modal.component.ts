import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ApiService } from '../../../../service/api.service';
import { SupplierClass } from '../../../../class/supplier';
@Component({
  selector: 'app-supplier-add-modal',
  templateUrl: './supplier-add-modal.component.html',
  styleUrls: ['./supplier-add-modal.component.css']
})
export class SupplierAddModalComponent implements OnInit {
  supplier: SupplierClass;
  constructor(
    private dialogRef: MdDialogRef<SupplierAddModalComponent>,
    private _service: ApiService
  ) {
    this.supplier = new SupplierClass();
  }

  ngOnInit() {
  }

  add() {
    this._service
      .postAssetsHttp(`/equipment-supplier`, this.supplier, (response: any) => {
        this.dialogRef.close({ 'status': 'refresh' });
      });
  }
}
