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
  ITdDataTableSortChangeEvent,
  TdDialogService
} from '@covalent/core';
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
  columns: ITdDataTableColumn[] = [];
  basicData = [];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  equipmentGeneralId = 0;
  tabIndex = '0';
  msg: string;
  returnMsg: string;
  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  stockStatus: number = 2;
  stockStatusList = [
    { "id": 2, "name": "全部" },
    { "id": 0, "name": "出库" },
    { "id": 1, "name": "入库" }
  ];

  constructor(
    private aRoute: ActivatedRoute,
    public dialog: MdDialog,
    private _service: ApiService,
    private _dialogService: TdDialogService
  ) { }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.ngOnInit();
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
      this.ngOnInit();
    });
  }

  selectEvent(e: any): any {
    this.selectedRows = e;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  ngOnInit() {
    document.getElementById('app-loading').style.display = 'flex';
    this.aRoute.params.subscribe((params) => {
      if (params.tabIndex == '0') {
        // 使用中二级资产
        this._service.getAssetsHttp(`/equipment-specific-valid/${params.equipmentGeneralId}/${this.stockStatus}/${this.page}/${this.pageSize}`,
          (response: any) => {
            this.basicData = response.entries;
            this.totalCount = response.totalCount;
            document.getElementById('app-loading').style.display = 'none';
          });

        this.columns = [
          { name: 'id', label: '序号' },
          { name: 'seriesNumber', label: '资产编号' },
          {
            name: 'stockStatus', label: '状态', format: v => {
              switch (v) {
                case '0':
                  return '出库';
                case '1':
                  return '入库';
                default:
                  return ''
              }
            }
          },
          { name: 'staffName', label: '使用人员' },
          { name: 'operation', label: '操作' },
        ];

      } else {
        // 已报废二级资产
        this._service.getAssetsHttp(`/equipment-specific-invalid/${params.equipmentGeneralId}/${this.page}/${this.pageSize}`,
          (response: any) => {
            this.basicData = response.entries;
            this.totalCount = response.totalCount;
            document.getElementById('app-loading').style.display = 'none';
          });

        this.columns = [
          { name: 'id', label: '序号' },
          { name: 'seriesNumber', label: '资产编号' },
          {
            name: 'status', label: '状态', format: z => {
              switch (z) {
                case 0:
                  return '使用中';
                case 1:
                  return '已报废';
                default:
                  return ''
              }
            }
          },
          { name: 'obsoleteDate', label: '报废日期' },
          { name: 'operation', label: '操作' },
        ];
      }
      this.equipmentGeneralId = params.equipmentGeneralId;
      this.tabIndex = params.tabIndex;
    });
  }

  openConfirm(status: any): void {
    if (this.selectedRows.length == 0) {
    } else {
      switch (status) {
        case 0:
          this.msg = "是否确定删除资产?";
          this.returnMsg = "删除成功!";
          break;
        case 3:
          this.msg = "是否确定申请报废?";
          this.returnMsg = "申请成功, 请等待审核";
          break;
        default:
          this.msg = "是否确定更改此状态?";
          this.returnMsg = "状态更改成功!";
          break;
      }

      this._dialogService.openConfirm({
        message: this.msg,
        disableClose: true,
        cancelButton: '取消',
        acceptButton: '确定',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          let equipmentIdArray = this.selectedRows.map(item => item.id);
          let equipmentGeneralId = this.equipmentGeneralId;

          this._service
            .postAssetsHttp(`/equipment-specific-status?equipmentIds=${equipmentIdArray}&equipmentGeneralId=${equipmentGeneralId}&status=${status}`
            , {}, (response: any) => {

              this._service.getAssetsHttp(`/equipment-specific-valid/${equipmentGeneralId}/${this.page}/${this.pageSize}`,
                (response: any) => {
                  this.basicData = response.entries;
                  this.totalCount = response.totalCount;
                });

            });
          this.openAlert(this.returnMsg);
        }
      });
    }
  }

  openAlert(msg: any): void {
    this._dialogService.openAlert({
      message: msg,
      disableClose: true,
      title: '提示',
      closeButton: '关闭',
    });
  }

  stockStatusChange() {
    this.ngOnInit();
  }

}
