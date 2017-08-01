import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';

@Component({
  selector: 'app-assets-type-modal',
  templateUrl: './assets-type-modal.component.html',
  styleUrls: ['./assets-type-modal.component.css']
})
export class AssetsTypeModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'asset.typeName', label: '类别名' },
  ];
  basicData: any[] = [
    {
      'id': 1,
      'asset': {
        'typeName': '电子设备'
      }
    }, {
      'id': 2,
      'asset': {
        'typeName': '办公家具'
      }
    }
  ];
  sortBy: string = 'name';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor() { }

  selectEvent(e:any):any {
    this.selectedRows = e;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  ngOnInit() {
  }

}
