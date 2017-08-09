import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-assets-type-modal',
  templateUrl: './assets-type-modal.component.html',
  styleUrls: ['./assets-type-modal.component.css']
})
export class AssetsTypeModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'equipmentTypeName', label: '类别名' },
  ];
  basicData = [];
  sortBy: string = 'equipmentTypeName';
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
    // 获取类型
    this._service
      .getBasicHttp(`/equipment-types`, (response: any) => {
        this.basicData = response;
      });
  }

}
