import { Component, OnInit } from '@angular/core';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  TdDialogService
} from '@covalent/core';
import { ApiService } from '../../../../service/api.service';
import { AssetsClass } from '../../class/assets';
@Component({
  selector: 'app-pre-obsolete-modal',
  templateUrl: './pre-obsolete-modal.component.html',
  styleUrls: ['./pre-obsolete-modal.component.css']
})
export class PreObsoleteModalComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'seriesNumber', label: '资产编号' },
    { name: 'name', label: '资产名称' },
    { name: 'equipmentTypeName', label: '类别' },
    { name: 'brand', label: '品牌' },
    { name: 'model', label: '规格型号' },
    { name: 'supplierName', label: '供应商' },
    { name: 'price', label: '单价(元)' },
    { name: 'purchaseDate', label: '购买时间' },
    { name: 'operation', label: '操作' },
  ];

  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  basicData: Array<AssetsClass>;
  msg: string;

  constructor(
    private _service: ApiService,
    private _dialogService: TdDialogService
  ) { }

  change(event: IPageChangeEvent): void {
    this.event = event;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  changeStatus(condition: any) {
    switch (condition.status) {
      case 1:
        this.msg = "是否确定批准报废资产?";
        break;
      case 2:
        this.msg = "是否确定拒绝报废资产?";
        break;
    }

    this._dialogService.openConfirm({
      message: this.msg,
      disableClose: true,
      cancelButton: '取消',
      acceptButton: '确定',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this._service
          .postAssetsHttp(`/equipment-specific-status?equipmentIds=${condition.id}&equipmentGeneralId=${condition.generalId}&status=${condition.status}`
          , {}, (response: any) => {

            this._service
              .getAssetsHttp(`/preObsolete-equipment-list/${this.page}/${this.pageSize}`, (response: any) => {
                this.basicData = response.entries;
                this.totalCount = response.totalCount;
              });

          });
      }
    });
  }

  ngOnInit() {
    document.getElementById('app-loading').style.display = 'flex';
    this._service
      .getAssetsHttp(`/preObsolete-equipment-list/${this.page}/${this.pageSize}`, (response: any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
        document.getElementById('app-loading').style.display = 'none';
      });
  }

}
