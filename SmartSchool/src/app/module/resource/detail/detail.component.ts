import { Component, OnInit } from '@angular/core';
import {
	Router,
	ActivatedRoute,
	Params
} from "@angular/router";
import { MdDialog } from '@angular/material';
import { 
  IPageChangeEvent,
} from '@covalent/core';
import { CommetClass } from '../public/commet-class';
import { ResourceClass } from '../public/resource-class';
import { ApiService } from '../../../service/api.service';
import { MsgComponent } from '../public/msg/msg.component';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	model:ResourceClass;
  commentlist:CommetClass[];
	event: IPageChangeEvent;
  firstLast: boolean = false;
  pageSizeAll: boolean = false;
  pageSize: number = 10;
  page: number = 1;
  totalElements: number = 0;
  postData:CommetClass;
  user = {
    user: {
      roleId:3
    }
  }
  constructor(
    private aRoute: ActivatedRoute, 
    private _service: ApiService,
    public dialog: MdDialog) {
  	
  }

  ngOnInit() {
    this.model = new ResourceClass();
    this.postData = new CommetClass();
    this.aRoute.params.subscribe((params) => {
      this._service.getResourceHttp(`/resource/${params.id}`, res => {
        this.model = res;
        document.getElementById('app-loading').style.display = "none";
      });
      this._service.getResourceHttp(`/resource/${params.id}/comment?page=1&pageSize=10`, res => {
        this.commentlist = res.content;
        this.totalElements = res.totalElements;
      });
      this._service.getBasicHttp(`/user/profile`, res => {
        this.user = res;
      });
    });
  }

  change(event: IPageChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._service.getResourceHttp(`/resource/${this.model.uuid}/comment?page=${this.page}&pageSize=${this.pageSize}`, res => {
      this.commentlist = res.content;
      this.totalElements = res.totalElements;
    })
  }

  save():void {
    this._service.postResourceHttp(`/resource/${this.model.uuid}/comment`, this.postData, res => {
      this.postData = new CommetClass();
      this._service.getResourceHttp(`/resource/${this.model.uuid}/comment?page=${this.page}&pageSize=${this.pageSize}`, res => {
        this.commentlist = res.content;
        this.totalElements = res.totalElements;
      })
    })
  }
  download():void {
    location.href = `/resource/${this.model.uuid}/download`
  }
  collection():void {
    this._service.postResourceHttp(`/resource/${this.model.uuid}/favorite`, {"favorite":true}, res => {
      let dialogRef = this.dialog.open(MsgComponent, {
        data:{"label":"收藏成功","msg":"", "color":"primary","icon":"success"},
        width:"60%"
      });
    })
  }
  reviewPass():void {
    this._service.postResourceHttp(`/resource/${this.model.uuid}/audit`, {"status":"PUBLISH","note":"同意发布"}, res => {
      let dialogRef = this.dialog.open(MsgComponent, {
        data:{"label":"审核成功","msg":"", "color":"primary","icon":"success"},
        width:"60%"
      });
    })
  }
  reviewFailed(): void {
    this._service.postResourceHttp(`/resource/${this.model.uuid}/audit`, {"status":"REJECT","note":"拒绝发布"}, res => {
      let dialogRef = this.dialog.open(MsgComponent, {
        data:{"label":"审核成功","msg":"", "color":"primary","icon":"success"},
        width:"60%"
      });
    })
  }
}
