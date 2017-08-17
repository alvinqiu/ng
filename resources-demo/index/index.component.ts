import { Component, OnInit } from '@angular/core';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { ApiService } from '../../../service/api.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  list:any = [];
  event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 20;
  page: number = 1;
  totalElements: number;
  searchInputTerm: string = "";
  typelist = [];
  gradelist = [];
  fileType = [];
  searchTypeId:string = "";
  searchStagesId:string = "";
  searchCourseId:string = "";
  constructor(
    private _service: ApiService
    ) {

  }
  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    
  }
  

}
