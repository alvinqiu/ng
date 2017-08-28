import { Component, OnInit } from '@angular/core';
import { Menu, MenuTeacher, MenuSuper } from '../../config/menu';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  Menu = {
  	children: []
  };
  user = {
    user: {
      roleId:3
    }
  }
  constructor(
  	private _service: ApiService
  	) { }

  ngOnInit() {
  	this._service.getBasicHttp("/user/profile", res => {
      this.user = res;
      switch (res.user.roleId) {
        case 1:
          this.Menu = MenuSuper[1];
          break;
        case 2:
          this.Menu = Menu[1];
          break;
        case 3:
          this.Menu = MenuTeacher[1];
          break;
        default:
          this.Menu = MenuTeacher[1];
          break;
      }
    })
  }

}
