import { Component, OnInit } from '@angular/core';
import { Menu, MenuTeacher, MenuSuper } from '../../config/menu';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
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
  	) {}

  ngOnInit() {
  	this._service.getBasicHttp("/user/profile", res => {
      this.user = res;
      switch (res.user.roleId) {
        case 1:
          this.Menu = MenuSuper[0];
          break;
        case 2:
          this.Menu = Menu[0];
          break;
        case 3:
          this.Menu = MenuTeacher[0];
          break;
        default:
          this.Menu = MenuTeacher[0];
          break;
      }
    })
  }

}
