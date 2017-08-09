import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css']
})
export class SupplierModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'supplierName', label: '供应商名称' },
    { name: 'supplierPhone', label: '供应商电话' },
    { name: 'supplierEmail', label: '供应商邮箱' },
  ];
  basicData = [];
  sortBy: string = 'supplierName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    private _service: ApiService
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
      .getBasicHttp(`/equipment-supplier-names`, (response: any) => {
        this.basicData = response;
      });
  }

}
