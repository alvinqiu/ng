import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { AssetsClass } from '../class/assets';
import { AssetsAddModalComponent } from '../public/assets-add-modal/assets-add-modal.component';
import { QrCodeModalComponent } from '../public/qr-code-modal/qr-code-modal.component';
import { AssetsTypeModalComponent } from '../public/assets-type-modal/assets-type-modal.component';
import { SupplierModalComponent } from '../public/supplier-modal/supplier-modal.component';
import { PreObsoleteModalComponent } from '../public/pre-obsolete-modal/pre-obsolete-modal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id', label: '序号' },
    { name: 'name', label: '资产名称' },
    { name: 'equipmentTypeName', label: '类别' },
    { name: 'brand', label: '品牌' },
    { name: 'model', label: '规格型号' },
    { name: 'supplierName', label: '供应商' },
    { name: 'validTotalQuantity', label: '总数量' },
    { name: 'outStockCount', label: '使用数' },
    { name: 'stockCount', label: '库存数' },
    { name: 'price', label: '单价(元)' },
    // { name: 'price', label: '总价(元)' },
    { name: 'purchaseDate', label: '购买时间' },
  ];

  basicValidData: Array<AssetsClass>;
  basicInvalidData: Array<AssetsClass>;
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  schoolList = [];
  schoolId: number = 0;
  userRole: any;
  disableFunc: boolean = false;

  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { }
  change(event: IPageChangeEvent): void {
    this.event = event;
  }
  openDialog(condition: any): void {
    let dialogRef = null;
    switch (condition.func) {
      case 'add':
        dialogRef = this.dialog.open(AssetsAddModalComponent, {
          data: {
            'condition': condition
          },
          width: '60%'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status == "refresh") {
            this.selectedRows = [];
            document.getElementById('app-loading').style.display = 'flex';
            this._service
              .getAssetsHttp(`/equipment-valid/${this.schoolId}/${this.page}/${this.pageSize}`, (response: any) => {
                this.basicValidData = response.entries;
                this.totalCount = response.totalCount;
                document.getElementById('app-loading').style.display = 'none';
              });
          }
        });
        break;
      case 'edit':
        if (this.selectedRows.length > 0) {
          dialogRef = this.dialog.open(AssetsAddModalComponent, {
            data: {
              'condition': condition,
              'asset': this.selectedRows[0]
            },
            width: '60%'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result && result.status == "refresh") {
              this.selectedRows = [];
              document.getElementById('app-loading').style.display = 'flex';
              this._service
                .getAssetsHttp(`/equipment-valid/${this.schoolId}/${this.page}/${this.pageSize}`, (response: any) => {
                  this.basicValidData = response.entries;
                  this.totalCount = response.totalCount;
                  document.getElementById('app-loading').style.display = 'none';
                });
            }
          });
        }
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
      case 'preObsolete':
        dialogRef = this.dialog.open(PreObsoleteModalComponent, {
          width: '80%'
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
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  changeTabs(e: any) {
    if (e.index === 1) {
      this.columns = [
        { name: 'id', label: '序号' },
        { name: 'name', label: '资产名称' },
        { name: 'equipmentTypeName', label: '类别' },
        { name: 'brand', label: '品牌' },
        { name: 'model', label: '规格型号' },
        { name: 'supplierName', label: '供应商' },
        { name: 'invalidTotalQuantity', label: '总数量' },
        { name: 'price', label: '单价(元)' },
        // { name: 'price', label: '总价(元)' , },
        { name: 'purchaseDate', label: '购买时间' },
      ];
      // 查询已报废资产      
      this._service
        .getAssetsHttp(`/equipment-invalid/${this.page}/${this.pageSize}`, (response: any) => {
          this.basicInvalidData = response.entries;
          this.totalCount = response.totalCount;
        });
    } else {
      this.columns = [
        { name: 'id', label: '序号' },
        { name: 'name', label: '资产名称' },
        { name: 'equipmentTypeName', label: '类别' },
        { name: 'brand', label: '品牌' },
        { name: 'model', label: '规格型号' },
        { name: 'supplierName', label: '供应商' },
        { name: 'validTotalQuantity', label: '总数量' },
        { name: 'outStockCount', label: '使用数' },
        { name: 'stockCount', label: '库存数' },
        { name: 'price', label: '单价(元)' },
        // { name: 'price', label: '总价(元)', filter: true},
        { name: 'purchaseDate', label: '购买时间' },
      ];

      this._service
        .getAssetsHttp(`/equipment-valid/${this.schoolId}/${this.page}/${this.pageSize}`, (response: any) => {
          this.basicValidData = response.entries;
          this.totalCount = response.totalCount;
        });
    }
  }

  schoolChange() {
    this.ngOnInit();
  }

  ngOnInit() {
    this._service.getBasicHttp("/user/profile", res => {
      this.userRole = res;

      if (this.schoolId !== 0 && this.userRole.user.roleId === 1 && this.userRole.user.schoolId !== this.schoolId) {
        this.disableFunc = true;
      } else { this.disableFunc = false; }
    });

    document.getElementById('app-loading').style.display = 'flex';
    this._service
      .getAssetsHttp(`/equipment-valid/${this.schoolId}/${this.page}/${this.pageSize}`, (response: any) => {
        this.basicValidData = response.entries;
        this.totalCount = response.totalCount;
        document.getElementById('app-loading').style.display = 'none';
      });

    this._service
      .getBasicHttp(`/api/bi/school/getSchoolByCondition`, (response: any) => {
        this.schoolList = response.entries;
      });

  }

}
