import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { SubjectsmodalComponent } from '../public/subjectsmodal/subjectsmodal.component';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { SubjectClass } from '../public/subjectsmodal/subject-class';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  basicData: SubjectClass[];
  columns: ITdDataTableColumn[] = [
    { name: 'subjectName', label: '学科名字' },
    { name: 'requiredSub', label: '必修科目', 
      format: v =>  {
          switch(v){
            case 0 :
              return "必修";
              // break;
            case 1 :
              return "选修";
              // break;
            default:
              return ""
          } 
      }
    },
    { name: 'schoolId', label: '学校' },
    { name: 'subjectDesc', label: '描述' },
  ];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchInputTerm: string;
  constructor(
    public dialog: MdDialog,
    private _service: ApiService
    ) { }

  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getBasicHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}`, (response:any) => {
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
      let dialogRef = this.dialog.open(SubjectsmodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getBasicHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
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
        .postBasicDelHttp(`/api/bi/subject/delSubject`, del, (response:any) => {
          this._service
            .getBasicHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
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
      .getBasicHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
      
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service
      .getBasicHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`, (response:any) => {
        this.basicData = response.entries;
        this.totalCount = response.totalCount;
      })
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }
}
