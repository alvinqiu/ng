import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent
} from '@covalent/core';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
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
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event)
  }
  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
  }

  search(e:any):any {
  	console.log(e)
  }

}
