import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  TdDialogService
} from '@covalent/core';
import { ApiService } from '../../../../service/api.service';
import { MsgmodalComponent } from '../../../basic/public/msgmodal/msgmodal.component';

@Component({
  selector: 'app-assets-type-modal',
  templateUrl: './assets-type-modal.component.html',
  styleUrls: ['./assets-type-modal.component.css']
})
export class AssetsTypeModalComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'id', label: '序号' },
    { name: 'equipmentTypeName', label: '类别名' },
  ];
  basicData = [];
  sortBy: string = 'equipmentTypeName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    public dialog: MdDialog,
    private _service: ApiService,
    private _dialogService: TdDialogService
  ) { }

  selectEvent(e: any): any {
    this.selectedRows = e;
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

  ngOnInit() {
    // 获取类型
    this._service
      .getAssetsHttp(`/equipment-types`, (response: any) => {
        this.basicData = response;
      });
  }

  delete(): void {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data: { "label": "错误", "msg": "请选择要删除的信息", "color": "accent", "icon": "error" },
        width: "40%"
      });
    } else {
      this._service
        .postBasicDelHttp(`/equipment-type/${this.selectedRows[0].id}`, [], (response: any) => {
          this.ngOnInit();
        });
    }
  }

  openPrompt(): void {
    this._dialogService.openPrompt({
      message: '新增资产类型',
      disableClose: true,
      cancelButton: '取消',
      acceptButton: '保存',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        // 保存资产类型
        this._service
          .postAssetsHttp(`/equipment-type`, { 'equipmentTypeName': newValue }, (response: any) => {
            this.ngOnInit();
          });
      }
    });
  }
}
