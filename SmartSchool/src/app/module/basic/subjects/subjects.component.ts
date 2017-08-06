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
          .getHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}`)
          .then((response:any) => {
            this.basicData = response.json().entries;
            this.totalCount = response.json().totalCount;
            document.getElementById('app-loading').style.display = "none";
          })
          .catch((e:any) => {
            console.log(e)
            document.getElementById('app-loading').style.display = "none";
          });
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
            .getHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
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
        .postDelHttp(`/api/bi/subject/delSubject`, del)
        .then((response:any) => {
          this._service
            .getHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
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
      .getHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`)
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
      .getHttp(`/api/bi/subject/getSubjectByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
      .then((response:any) => {
        this.basicData = response.json().entries;
        this.totalCount = response.json().totalCount;
      })
      .catch((e:any) => {
        console.log(e)
      });
  }

  toggleFirstLast(): void {
    this.firstLast = !this.firstLast;
    console.log("firstLast")
  }
}
