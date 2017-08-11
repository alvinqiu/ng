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
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { DepartmentClass } from '../public/departmentmodal/department-class';
import { BuildingClass } from '../public/buildingsmodal/building-class';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  nodes = [];
  node:DepartmentClass;
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: number;
  departments:Array<DepartmentClass>;
  buildings: Array<BuildingClass>;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }

  ngOnInit() {
    this.node = new DepartmentClass();
    this._service
        .getBasicHttp(`/api/bi/department/getDepartmentAttr`, (response:any) => {
          this.nodes = response;
          document.getElementById('app-loading').style.display = "none";
        })
    this._service
        .getBasicHttp(`/api/bi/building/getBuildingByCondition`, (response:any) => {
          this.buildings = response.entries;
        })
    this._service
        .getBasicHttp(`/api/bi/department/getDepartmentByCondition`, (response:any) => {
          this.departments = response.entries;
        })
  }
  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
  }

  openDialog(condition:any):void {
    condition.buildings = this.buildings;
    condition.departments = this.departments;
    condition.node = this.node;
    if ( condition.func == 'modify' && condition.node == undefined) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(DepartmentmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "add") {
            this._service
            .getBasicHttp(`/api/bi/department/getDepartmentAttr`, (response:any) => {
              this.nodes = response;
              
            })  
        }
        if (result && result.status == "modify") {
            this._service
            .getBasicHttp(`/api/bi/department/getDepartmentByCondition`, (response:any) => {
              // this.nodes = response;
              
            })  
        }
      });
    }
  }
  delete():void {
    
  }
  filter(id): string {
    if (id.indexOf("a_") > -1) {
      return id.split("a_")[1];
    }
    if (id.indexOf("g_") > -1) {
      return id.split("g_")[1];
    }
    return "";
  }
  handleSearch(searchInputTerm: string):void {
    console.log(searchInputTerm)
  }
  
  searchByid(id:any): void {
    this.searchInputTerm = id;
    this._service
        .getBasicHttp(`/api/bi/department/getDepartmentByCondition`, (response:any) => {
          this.node = response.entries[0];
        })

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
