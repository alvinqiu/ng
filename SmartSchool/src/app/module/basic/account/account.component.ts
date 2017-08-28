import { Component, OnInit } from '@angular/core';
import { StaffsmodalComponent } from '../public/staffsmodal/staffsmodal.component';

import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';

import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  basicData: any[] = [
    { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
     { name: '清华大学', status: '否', parent: '中国教育部'},
    { name: '清华大学成都校区', status: '是', parent: '清华大学'},
    { name: '清华大学深圳校区', status: '是', parent: '清华大学'},
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: '学校名称' },
    { name: 'status', label: '分校区' },
    { name: 'parent', label: '母校' },
    { name: 'tel', label: '联系电话' },
    { name: 'addr', label: '地址' },
  ];
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { }

  ngOnInit() {
  }

  selectEvent(e:any):any {
    
  }

  openDialog():void {
    let dialogRef = this.dialog.open(StaffsmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  handleSearch(searchInputTerm: string):void {
  }


  change(event: IPageChangeEvent): void {
    this.event = event;
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
  }

}
