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
import { SchoolInterface } from '../../../interface/school';

import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  basicData: Array<SchoolInterface>;
  columns: ITdDataTableColumn[] = [
    { name: 'code', label: '学校ID' },
    { name: 'name', label: '学校名称' },
    // { name: 'addr', label: '学校地址' },
    { name: 'branch', label: '是否是分校' },
    { name: 'parent_school', label: '隶属学校' },
    { name: 'nominated_contact_person', label: '校长' },
    { name: 'office_no', label: '办公室电话' },
    { name: 'nominated_contact_no', label: '移动电话' },
    
  ];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number;
  totalCount: number;

  searchInputTerm: string;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { 

    
  }
  
  ngOnInit() {
    this._service
        .getHttp("/api/bi/school/1/20")
        .then((response:any) => {
          this.basicData = response.json().entries;
          this.totalCount = response.json().totalCount;
        })
        .catch((e:any) => {console.log(e)});
  }

  selectEvent(e:any):any {
  	// console.log(e)
  	// console.log(this.selectedRows)
  }

  openDialog(condition:any):void {
    let dialogRef = this.dialog.open(SchoolsmodalComponent, {
      data: condition,
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }


  change(event: IPageChangeEvent): void {
    console.log(event)
    this._service
        .getHttp(`/api/bi/school/${event.page}/${event.pageSize}`)
        .then((response:any) => {
          this.basicData = response.json().entries;
          this.totalCount = response.json().totalCount;
        })
        .catch((e:any) => {
          console.log(e)
        });
  }


  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    // console.log(sortEvent)
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
  }
}
