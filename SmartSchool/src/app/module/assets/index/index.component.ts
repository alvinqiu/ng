import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { AssetsAddModalComponent } from '../public/assets-add-modal/assets-add-modal.component';
import { QrCodeModalComponent } from '../public/qr-code-modal/qr-code-modal.component';

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
    { name: 'asset.price', label: '单价' },
    { name: 'asset.price', label: '总价' },
    { name: 'asset.purchaseDate', label: '购买时间' },
    { name: 'operation', label: '操作' },
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
      },
      'operation':'edit',
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
      },
      'operation':'edit',
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
      },
      'operation':'edit',
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
      },
      'operation':'edit',
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
      },
      'operation':'edit',
    }
  ];

  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number;
  totalCount: number;

  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    public dialog: MdDialog
  ) { }
  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event);
  }
  openDialog(condition:any):void {
    let dialogRef = null;
    switch(condition.func){
      case 'add':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          width:"60%"
        });
        break;
      case 'qrCode':
        dialogRef = this.dialog.open(QrCodeModalComponent, {
          width:"60%"
        });
        break;
      case 'type':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          width:"60%"
        });
        break;
      case 'supplier':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          width:"60%"
        });
        break;
      case 'rule':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          width:"60%"
        });
        break;
      default:
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  selectEvent(e:any):any {
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
