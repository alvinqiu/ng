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
import { BuildingClass } from '../public/buildingsmodal/building-class';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  basicData: BuildingClass[];
  columns: ITdDataTableColumn[] = [
    { name: 'buildingName', label: '建筑名字' },
    { name: 'attributeId', label: '建筑用途', format: v =>  {
          switch(v){
            case 0 :
              return "教学楼";
              // break;
            case 1 :
              return "行政楼";
              // break;
            case 2 :
              return "图书馆";
              // break;
            case 3 :
              return "学生宿舍";
              // break;
            case 4 :
              return "教室宿舍";
            case 5 :
              return "实验楼";
              // break;
            default:
              return ""
          } 
        }
    },
    { name: 'address', label: '建筑地址' },
    { name: 'buildingDesc', label: '建筑描述' },
    
  ];
  selectedRows: any[] = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  searchInputTerm: string;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  sortBy: string = 'buildingName';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { 
  }
  
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service
        .getBasicHttp(`/api/bi/building/getBuildingByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
          this.basicData = response.entries;
          this.totalCount = response.totalCount;
          document.getElementById('app-loading').style.display = "none";
        })
        
  }

  selectEvent(e:any):any {
  	console.log(e)
  	console.log(this.selectedRows)
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(BuildingsmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getBasicHttp(`/api/bi/building/getBuildingByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              
            })
            
        }
      });
    }
    
  }
  delete():void {
    if (this.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要删除的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      
      let reqlist = this.selectedRows.map( item => item.id);
      let del = `gradeIds=${reqlist.join('&gradeIds=')}`

      this._service
        .postBasicDelHttp(`/api/bi/building/delBuilding`, del, (response:any) => {
          this._service
            .getBasicHttp(`/api/bi/building/getBuildingByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
              this.basicData = response.entries;
              this.totalCount = response.totalCount;
              this.selectedRows = [];
            })
            
        })
        
    }
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getBasicHttp(`/api/bi/building/getBuildingByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/building/getBuildingByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
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
