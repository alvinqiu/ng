import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { IPageChangeEvent } from '@covalent/core';
import {
  Router,
  ActivatedRoute,
  Params
} from "@angular/router";
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
    private aRoute: ActivatedRoute, 
  	) { }

  ngOnInit() {
    this.aRoute.params.subscribe((params) => {
      this.searchInputTerm = params.id?params.id:'';
    })
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });

  }
  handleSearch(searchInputTerm: string) {
    this.searchInputTerm = searchInputTerm?searchInputTerm:'';
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
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
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });
  }

  ascending() {
    this.sort = "asc";
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
      this.resourcelist = res.content;
      this.totalCount = res.totalElements;
      document.getElementById('app-loading').style.display = "none";
    });
  }

  descending() {
    this.sort = "des";
    document.getElementById('app-loading').style.display = "flex";
    this._service.getResourceHttp(`/resource?keyword=${this.searchInputTerm}&page=${this.page}&size=${this.pageSize}&resSort=${this.sort}`, res => {
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
