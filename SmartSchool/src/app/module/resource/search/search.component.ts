import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IPageChangeEvent } from '@covalent/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInputTerm: string = "";
  pageSize: number = 20;
  page: number = 1;
  totalCount: number = 0;
  resourcelist = [];
  initialPage: number = 1;
  sort = "asc";
  constructor(
  	private _service: ApiService,
  	) { }

  ngOnInit() {
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?name=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&sort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });

  }
  handleSearch(searchInputTerm: string) {
    this.searchInputTerm = searchInputTerm;
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&sort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });

  }
  download(e) {
    location.href = `/resource/${e}/download`;
  }

  change(event: IPageChangeEvent): void {
    document.getElementById('app-loading').style.display = "flex";
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&sort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });
  }
  iconfont(e) {
    switch(e) {
      case "WORD":
        return "iconfont icon-word"
      case "PPT":
        return "iconfont icon-PPT"
      case "PDF":
        return "iconfont icon-pdf"
      case "TEXT":
        return "iconfont icon-txt"
      case "IMAGE":
        return "iconfont icon-image"
      case "VIDEO":
        return "iconfont icon-vedio"
      case "VOICE":
        return "iconfont icon-voice"
      default:
        return "iconfont icon-file"

    }
  }

}
