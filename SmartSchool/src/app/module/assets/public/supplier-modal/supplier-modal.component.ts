import { Component, OnInit } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';


@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.css']
})
export class SupplierModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'supplier.name', label: '供应商名称' },
    { name: 'supplier.phone', label: '供应商电话' },
    { name: 'supplier.mail', label: '供应商邮箱' },
  ];
  basicData: any[] = [
    {
      'id': 1,
      'supplier': {
        'name': '数懒',
        'phone': '13551067588',
        'mail': 'xx@c.cn'
      }
    }, {
      'id': 2,
      'supplier': {
        'name': 'apple',
        'phone': '13656789098',
        'mail': 'yy@c.cn'
      }
    }, {
      'id': 3,
      'supplier': {
        'name': '阿里',
        'phone': '13779862563',
        'mail': 'zz@c.cn'
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
