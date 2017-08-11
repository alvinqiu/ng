import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  TdDialogService
} from '@covalent/core';
import { ApiService } from '../../../../service/api.service';
import { MsgmodalComponent } from '../../../basic/public/msgmodal/msgmodal.component';
import { SupplierAddModalComponent } from '../supplier-add-modal/supplier-add-modal.component';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css']
})
export class SupplierModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id', label: '序号' },
    { name: 'supplierName', label: '供应商名称' },
    { name: 'supplierPhone', label: '供应商电话' },
    { name: 'supplierEmail', label: '供应商邮箱' },
  ];
  basicData = [];
  sortBy: string = 'supplierName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService,
    private _dialogService: TdDialogService
  ) { }

  selectEvent(e: any): any {
    this.selectedRows = e;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
  ngOnInit() {
    // 获取供应商
    this._service
      .getAssetsHttp(`/equipment-supplier-names`, (response: any) => {
        this.basicData = response;
      });
  }
  delete(): void {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择要删除的信息", "color": "accent", "icon": "error" },
        width: "40%"
      });
    } else {
      this.selectedRows.map(item => {
        this._service
          .postAssetsDelHttp(`/equipment-supplier/${item.id}`, (response: any) => { });
      });
      // 获取供应商
      this._service
        .getAssetsHttp(`/equipment-supplier-names`, (response: any) => {
          this.basicData = response;
        });
    }
  }

  openDialog(): void {
    this.dialog.open(SupplierAddModalComponent, { width: '40%' }).afterClosed().subscribe(result => {
      if (result && result.status == "refresh") {
        // 获取供应商
        this._service
          .getAssetsHttp(`/equipment-supplier-names`, (response: any) => {
            this.basicData = response;
          });
      }
    });
  }
}
