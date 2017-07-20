import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { BuildingsmodalComponent } from '../public/buildingsmodal/buildingsmodal.component';

import { Http,Headers  } from '@angular/http';
@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

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
    { name: 'code', label: '建筑名字' },
    { name: 'name', label: '建筑用途' },
    { name: 'addr', label: '建筑地址' },
    { name: 'status', label: '建筑描述' },
    
  ];
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
  ) { 
    this._service.getHttp("/hxwwz/rest/json/info/getUserRisk?name=1").then((e:any) => {console.log(e.json())}).catch((e:any) => {console.log(e)});
  }
  
  ngOnInit() {
  }

  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
  }

  openDialog():void {
    let dialogRef = this.dialog.open(BuildingsmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }


  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event)
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    console.log(sortEvent)
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }

}
