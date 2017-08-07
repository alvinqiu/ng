import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent,
  TdDataTableSortingOrder,
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { OfficesmodalComponent } from '../public/officesmodal/officesmodal.component';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { OfficeClass } from '../public/officesmodal/office-class';
import { Http,Headers  } from '@angular/http';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  basicData: OfficeClass[];
  columns: ITdDataTableColumn[] = [
    { name: 'roomName', label: '教室名字' },
    { name: 'attributeId', label: '用途属性', format: v =>  {
          switch(v){
            case 0 :
              return "教室";
              // break;
            case 1 :
              return "办公室";
              // break;
            case 2 :
              return "实验室";
              // break;
            case 3 :
              return "行政室";
              // break;
            default:
              return ""
          } 
        }
    },
    { name: 'buildingName', label: '教室地址' },
    { name: 'maxCapacity', label: '最大容纳人数' },
    { name: 'roomDesc', label: '描述' },
    
  ];
  buildinglist = [];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchInputTerm: string;
  sortBy: string = 'roomName';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
  ) { 
  }
  
  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getHttp(`/api/bi/room/getRoomByCondition?page=${this.page}&pageSize=${this.pageSize}`)
          .then((response:any) => {
            this.basicData = response.json().entries;
            this.totalCount = response.json().totalCount;
            document.getElementById('app-loading').style.display = "none";
          })
          .catch((e:any) => {
            console.log(e)
            document.getElementById('app-loading').style.display = "none";
          });
      this._service
          .getHttp(`/api/bi/building/getBuildingByCondition`)
          .then((response:any) => {
            this.buildinglist = response.json().entries;
          })
          .catch((e:any) => {
            console.log(e)
          });
  }
  
  selectEvent(e:any):any {
    console.log(e)
    console.log(this.selectedRows)
  }

  openDialog(condition:any):void {
    condition.selectedRows = this.selectedRows;
    condition.buildinglist = this.buildinglist;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(OfficesmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getHttp(`/api/bi/room/getRoomByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
            .then((response:any) => {
              this.basicData = response.json().entries;
              this.totalCount = response.json().totalCount;
              
            })
            .catch((e:any) => {
              console.log(e)
            });
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
        .postDelHttp(`/api/bi/room/delRoom`, del)
        .then((response:any) => {
          this._service
            .getHttp(`/api/bi/room/getRoomByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
            .then((response:any) => {
              this.basicData = response.json().entries;
              this.totalCount = response.json().totalCount;
              this.selectedRows = [];
            })
            .catch((e:any) => {console.log(e)});
        })
        .catch((e:any) => {
          console.log(e)
        });
    }
  }
  handleSearch(searchInputTerm: string):void {
    this.searchInputTerm = searchInputTerm;
    this.page = 1;
    this._service
      .getHttp(`/api/bi/room/getRoomByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`)
      .then((response:any) => {
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      })
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getHttp(`/api/bi/room/getRoomByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
      .then((response:any) => {
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      });
  }

}
