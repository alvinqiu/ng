import { Component, OnInit, Inject } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-stock-history-modal',
  templateUrl: './stock-history-modal.component.html',
  styleUrls: ['./stock-history-modal.component.css']
})
export class StockHistoryModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'staffName', label: '姓名' },
    { name: 'phone', label: '电话' },
    { name: 'lendDate', label: '借出日期' },
    { name: 'returnDate', label: '归还日期' },
    { name: 'status', label: '状态' },
  ];
  basicData = [];
  pageSize: number = 20;
  page: number = 1;
  event: IPageChangeEvent;
  totalCount: number;
  sortBy: string = 'id';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    @Inject(MD_DIALOG_DATA) groups: any,
    private _service: ApiService
  ) {
    this._service.getAssetsHttp(`/equipment-history/${groups}/${this.page}/${this.pageSize}`, (response: any) => {
      this.basicData = response.entries;
      this.totalCount = response.totalCount;
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  change(event: IPageChangeEvent): void {
    this.event = event;
  }

  ngOnInit() {
  }

}
