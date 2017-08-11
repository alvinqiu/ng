import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { DepartmentmodalComponent } from '../public/departmentmodal/departmentmodal.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  nodes = [];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string;
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
    let dialogRef = this.dialog.open(DepartmentmodalComponent, {
      data:{"value":"test"},
      width:"60%"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }
  
  searchByid(id:any): void {

  }

  change(event: IPageChangeEvent): void {
    this.event = event;
    console.log(event)
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }
}
