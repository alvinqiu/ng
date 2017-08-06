import { Component, OnInit } from '@angular/core';
import { 
  ITdDataTableColumn,
  IPageChangeEvent
} from '@covalent/core';
import { MdDialog } from '@angular/material';
import { ApiService } from '../../../service/api.service';
import { CoursemodalComponent } from '../public/coursemodal/coursemodal.component';
import { MsgmodalComponent } from '../public/msgmodal/msgmodal.component';
import { CourseClass } from '../public/coursemodal/course-class';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  basicData: CourseClass[];
  columns: ITdDataTableColumn[] = [
    { name: 'courseName', label: '课程名称' },
    { name: 'subjectName', label: '所属科目' },
    { name: 'gradeName', label: '所属年级' },
    { name: 'requiredCour', label: '是否必修课', 
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
    { name: 'period', label: '总学时' },
    { name: 'courseDesc', label: '课程描述' },
  ];
  selectedRows: any[] = [];
  firstLast: boolean = false;
  event: IPageChangeEvent;
  pageSize: number = 20;
  page: number = 1;
  totalCount: number;
  searchInputTerm: string;
  gradelist = [];
  subjectlist = [];
  constructor(
  	public dialog: MdDialog,
    private _service: ApiService
  	) { }

  ngOnInit() {
      document.getElementById('app-loading').style.display = "flex";
      this._service
          .getHttp(`/api/bi/course/getCourseByCondition?page=${this.page}&pageSize=${this.pageSize}`)
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
          .getHttp(`/api/bi/subject/getSubjectByCondition`)
          .then((response:any) => {
            this.subjectlist = response.json().entries;
          })
          .catch((e:any) => {
            console.log(e)
          });
    this._service
          .getHttp(`/api/bi/grade/getGradeByCondition`)
          .then((response:any) => {
            this.gradelist = response.json().entries;
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
    condition.gradelist = this.gradelist;
    condition.subjectlist = this.subjectlist;
    if ( (condition.func == 'check' || condition.func == 'modify') && condition.selectedRows.length == 0) {
      let dialogRef = this.dialog.open(MsgmodalComponent, {
        data:{"label":"错误","msg":"请选择要操作的信息", "color":"accent","icon":"error"},
        width:"60%"
      });
    } else {
      let dialogRef = this.dialog.open(CoursemodalComponent, {
        data: condition,
        width:"60%"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status == "refresh") {
            this.selectedRows = [];
            this._service
            .getHttp(`/api/bi/course/getCourseByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
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
        .postDelHttp(`/api/bi/course/delCourse`, del)
        .then((response:any) => {
          this._service
            .getHttp(`/api/bi/course/getCourseByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
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
      .getHttp(`/api/bi/course/getCourseByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${searchInputTerm}`)
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
      .getHttp(`/api/bi/course/getCourseByCondition?page=${this.page}&pageSize=${this.pageSize}&name=${this.searchInputTerm}`)
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
