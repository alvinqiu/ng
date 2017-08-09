import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { CreateQrCodeModalComponent } from '../public/create-qr-code-modal/create-qr-code-modal.component';
import { InOutStockModalComponent } from '../public/in-out-stock-modal/in-out-stock-modal.component';
import { StockHistoryModalComponent } from '../public/stock-history-modal/stock-history-modal.component';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: '序号' },
    { name: 'seriesNumber', label: '资产编号' },
    { name: 'stockStatus', label: '状态' },
    { name: 'status', label: '使用人员' },
    { name: 'operation', label: '操作' },
  ];

  basicData = [];
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
    private aRoute: ActivatedRoute,
    public dialog: MdDialog,
    private _service: ApiService
  ) { }

  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event);
  }

  openDialog(condition: any): void {
    condition.selectedRows = this.selectedRows;
    let dialogRef = null;
    switch (condition.func) {
      case 'create':
        dialogRef = this.dialog.open(CreateQrCodeModalComponent, {
          data: condition.selectedRows,
          width: '40%'
        });
        break;
      case 'inOutStock':
        dialogRef = this.dialog.open(InOutStockModalComponent, {
          data: condition.seriesNumber,
          width: '60%'
        });
        break;
      case 'StockHistory':
        dialogRef = this.dialog.open(StockHistoryModalComponent, {
          data: condition.id,
          width: '60%'
        });
        break;
      default:
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
    });
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
    document.getElementById('app-loading').style.display = 'flex';
    this.aRoute.params.subscribe((params) => {
      this._service.getAssetsHttp(`/equipment-specific-valid/${params.equipmentGeneralId}/${this.page}/${this.pageSize}`,
        (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
        document.getElementById('app-loading').style.display = 'none';
      });
    });
  }

}
