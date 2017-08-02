import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'asset.seriesNumber', label: '资产编号' },
    { name: 'asset.stockStatus', label: '状态' },
    { name: 'asset.person', label: '使用人员' },
  ];

  basicData: any[] = [
    {
      'id': 1,
      'asset': {
        'seriesNumber': 'S12345',
        'stockStatus': '出库',
        'person': 'Rain',
      }
    }, {
      'id': 2,
      'asset': {
        'seriesNumber': 'S12346',
        'stockStatus': '未出库',
        'person': '',
      }
    }
  ];

  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;

  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { }

  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event);
  }

  openDialog(condition: any): void {
    // let dialogRef = null;
    // switch (condition.func) {
    //   case 'scrap':
    //     dialogRef = this.dialog.open(AssetsAddModalComponent, {
    //       width:"40%"
    //     });
    //     break;
    //   case 'delete':
    //     dialogRef = this.dialog.open(QrCodeModalComponent, {
    //       width:"40%"
    //     });
    //     break;
    //   case 'print':
    //     dialogRef = this.dialog.open(AssetsTypeModalComponent, {
    //       width:"40%"
    //     });
    //     break;
    //   default:
    //     break;
    // }
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  selectEvent(e: any): any {
    this.selectedRows = e;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    // console.log(sortEvent)
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  ngOnInit() {
  }

}
