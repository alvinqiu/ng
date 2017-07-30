import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn } from '@covalent/core';
import { MdDialog } from '@angular/material';
import { AssetsAddModalComponent } from '../public/assets-add-modal/assets-add-modal.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  event: IPageChangeEvent;
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
    { name: '', label: '操作' },
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
    }
  ];

  constructor(
    public dialog: MdDialog
  ) { }
  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event);
  }
  openDialog():void {
    let dialogRef = this.dialog.open(AssetsAddModalComponent, {
      data:{"id":"1"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}
