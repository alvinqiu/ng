import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { SchoolsmodalComponent } from '../public/schoolsmodal/schoolsmodal.component';

import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
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
    { name: 'code', label: '学校ID' },
    { name: 'name', label: '学校名称' },
    { name: 'addr', label: '学校地址' },
    { name: 'status', label: '是否是分校' },
    { name: 'parent', label: '隶属学校' },
    { name: 'principal', label: '校长' },
    { name: 'phone', label: '办公室电话' },
    { name: 'tel', label: '移动电话' },
    
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
    let dialogRef = this.dialog.open(SchoolsmodalComponent, {
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
