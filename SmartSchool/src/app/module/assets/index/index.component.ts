import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
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
    { name: 'id',  label: '序号' },
    { name: 'asset.name', label: '资产名称' },
    { name: 'asset.type', label: '类别' },
    { name: 'asset.brand', label: '品牌' },
    { name: 'asset.model', label: '规格型号' },
    { name: 'asset.supplier', label: '供应商' },
    { name: 'asset.totalQuantity', label: '总数量' },
    { name: 'asset.inventoryQuantity', label: '使用数' },
    { name: 'asset.inventoryQuantity', label: '库存数' },
    { name: 'asset.price', label: '单价(元)' },
    { name: 'asset.price', label: '总价(元)' },
    { name: 'asset.purchaseDate', label: '购买时间' },
  ];

  basicData: any[] = [
    {
      'id': 1,
      'asset': {
        'name': 'test',
        'type': 'test',
        'brand': 'test',
        'model': 'test',
        'supplier': 'test',
        'totalQuantity': 'test',
        'inventoryQuantity': 'test',
        'price': 'test',
        'purchaseDate': 'test',
      }
    }, {
      'id': 2,
      'asset': {
        'name': 'test',
        'type': 'test',
        'brand': 'test',
        'model': 'test',
        'supplier': 'test',
        'totalQuantity': 'test',
        'inventoryQuantity': 'test',
        'price': 'test',
        'purchaseDate': 'test',
      }
    },{
      'id': 3,
      'asset': {
        'name': 'test',
        'type': 'test',
        'brand': 'test',
        'model': 'test',
        'supplier': 'test',
        'totalQuantity': 'test',
        'inventoryQuantity': 'test',
        'price': 'test',
        'purchaseDate': 'test',
      }
    },{
      'id': 4,
      'asset': {
        'name': 'test',
        'type': 'test',
        'brand': 'test',
        'model': 'test',
        'supplier': 'test',
        'totalQuantity': 'test',
        'inventoryQuantity': 'test',
        'price': 'test',
        'purchaseDate': 'test',
      }
    },{
      'id': 5,
      'asset': {
        'name': 'test',
        'type': 'test',
        'brand': 'test',
        'model': 'test',
        'supplier': 'test',
        'totalQuantity': 'test',
        'inventoryQuantity': 'test',
        'price': 'test',
        'purchaseDate': 'test',
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
  openDialog(condition:any):void {
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
        .getHttp(`/asset/equipment-specific-valid?equipmentGeneralId=${equipmentGeneralId}&page=${this.page}&pageSize=${this.pageSize}`)
        .then((response: any) => {
          console.log(response);

        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }

  ngOnInit() {
  }

}
