import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { AssetsClass } from '../../../class/assets';
import { AssetsAddModalComponent } from '../public/assets-add-modal/assets-add-modal.component';
import { QrCodeModalComponent } from '../public/qr-code-modal/qr-code-modal.component';
import { AssetsTypeModalComponent } from '../public/assets-type-modal/assets-type-modal.component';
import { SupplierModalComponent } from '../public/supplier-modal/supplier-modal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'asset.id',  label: '序号' },
    { name: 'asset.name', label: '资产名称' },
    { name: 'asset.equipmentTypeName', label: '类别' },
    { name: 'asset.brand', label: '品牌' },
    { name: 'asset.model', label: '规格型号' },
    { name: 'asset.supplierName', label: '供应商' },
    { name: 'asset.validTotalQuantity', label: '总数量' },
    { name: 'asset.outStockCount', label: '使用数' },
    { name: 'asset.stockCount', label: '库存数' },
    { name: 'asset.price', label: '单价(元)' },
    { name: 'asset.price', label: '总价(元)' },
    { name: 'asset.purchaseDate', label: '购买时间' },
  ];

  basicData: Array<AssetsClass>;
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
    let dialogRef = null;
    switch (condition.func) {
      case 'add':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          width: '60%'
        });
        break;
      case 'edit':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          data: '',
          width: '60%'
        });
        break;
      case 'qrCode':
        dialogRef = this.dialog.open(QrCodeModalComponent, {
          width: '40%'
        });
        break;
      case 'type':
        dialogRef = this.dialog.open(AssetsTypeModalComponent, {
          width: '40%'
        });
        break;
      case 'supplier':
        dialogRef = this.dialog.open(SupplierModalComponent, {
          width: '50%'
        });
        break;
      // case 'rule':
      //   dialogRef = this.dialog.open(AssetsAddModalComponent, {
      //     width:"60%"
      //   });
      //   break;
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

  handleSpecific(): void {
    let equipmentGeneralId = 0;
    if (this.selectedRows.length > 0) {
      equipmentGeneralId = this.selectedRows[0].id;

      this._service
        .getBasicHttp(`/asset/equipment-specific-valid?equipmentGeneralId=${equipmentGeneralId}&page=${this.page}&pageSize=${this.pageSize}`)
        .then((response: any) => {
          console.log(response);

        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }

  ngOnInit() {
    // document.getElementById('app-loading').style.display = 'flex';
    // this._service
    //   .getBasicHttp(`/asset/equipment-valid?page=${this.page}&pageSize=${this.pageSize}`, (response: any) => {
    //     this.basicData = response.entries;
    //     this.totalCount = response.totalCount;
    //     document.getElementById('app-loading').style.display = 'none';
    //   });
  }

}
