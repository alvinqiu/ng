import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { GradesmodalComponent } from '../public/gradesmodal/gradesmodal.component';

import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
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
    { name: 'code', label: '年级名字' },
    { name: 'name', label: '年级属性' },
    { name: 'addr', label: '入学年' },
    { name: 'status', label: '年级负责人' },
    { name: 'parent', label: '状态' },
    { name: 'principal', label: '学校' },
    { name: 'phone', label: '描述' },
    
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
  ) { }

  ngOnInit() {
  }

  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
  }

  openDialog():void {
    let dialogRef = this.dialog.open(GradesmodalComponent, {
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
